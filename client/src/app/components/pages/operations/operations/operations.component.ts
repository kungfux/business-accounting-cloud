import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { ContactApiService } from 'src/app/services/api/contact.service';
import { ExpenditureApiService } from 'src/app/services/api/expenditure.service';
import { IncomeApiService } from 'src/app/services/api/income.service';
import { Contact } from 'src/app/services/api/models/contact';
import { Expenditure } from 'src/app/services/api/models/expenditure';
import { Income } from 'src/app/services/api/models/income';
import { Operation } from 'src/app/services/api/models/operation';
import { Property } from 'src/app/services/api/models/property';
import { OperationApiService } from 'src/app/services/api/operation.service';
import { PropertyApiService } from 'src/app/services/api/property.service';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { HandsetService } from 'src/app/services/handset.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css', '../../listPage.css'],
})
export class OperationsComponent implements OnInit {
  operations: Operation[] = [];
  contacts: Contact[] = [];
  properties: Property[] = [];
  incomes: Income[] = [];
  expenditures: Expenditure[] = [];
  selectedOperation?: Operation;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;
  isHandset = this.handset.isHandset;

  filterShow: boolean = false;
  filterRangeStart?: Date = undefined;
  filterRangeEnd?: Date = undefined;

  constructor(
    public userPreferences: UserPreferencesService,
    public currency: CurrencyService,
    private router: Router,
    private operationApi: OperationApiService,
    private contactApi: ContactApiService,
    private propertyApi: PropertyApiService,
    private incomeApi: IncomeApiService,
    private expenditureApi: ExpenditureApiService,
    private handset: HandsetService
  ) {}

  ngOnInit(): void {
    this.getOperations();
  }

  getOperations(offset: number = 0): void {
    this.isLoading = true;
    this.operationApi
      .getOperations(
        this.userPreferences.companyId!,
        this.filterRangeStart!,
        this.filterRangeEnd!,
        offset
      )
      .subscribe({
        next: (operations) => {
          this.operations = operations;
          this.getContacts();
        },
      });
  }

  getContacts(): void {
    const contactIds: number[] = [];
    this.operations.forEach((operation) => {
      if (operation.contactId) {
        if (contactIds.find((id) => id === operation.contactId) === undefined) {
          contactIds.push(operation.contactId);
        }
      }
    });

    this.contacts = [];
    if (contactIds.length > 0) {
      this.contactApi.getExactContacts(contactIds).subscribe({
        next: (contacts) => {
          this.contacts = contacts;
          this.getProperties();
        },
      });
    } else {
      this.getProperties();
    }
  }

  getProperties(): void {
    const propertyIds: number[] = [];
    this.operations.forEach((operation) => {
      if (operation.propertyId) {
        if (
          propertyIds.find((id) => id === operation.propertyId) === undefined
        ) {
          propertyIds.push(operation.propertyId);
        }
      }
    });

    this.properties = [];
    if (propertyIds.length > 0) {
      this.propertyApi.getExactProperties(propertyIds).subscribe({
        next: (properties) => {
          this.properties = properties;
          this.getIncomes();
        },
      });
    } else {
      this.getIncomes();
    }
  }

  getIncomes(): void {
    const incomeIds: number[] = [];
    this.operations.forEach((operation) => {
      if (operation.incomeId) {
        if (incomeIds.find((id) => id === operation.incomeId) === undefined) {
          incomeIds.push(operation.incomeId);
        }
      }
    });

    this.incomes = [];
    if (incomeIds.length > 0) {
      this.incomeApi.getExactIncomes(incomeIds).subscribe({
        next: (incomes) => {
          this.incomes = incomes;
          this.getExpenditures();
        },
      });
    } else {
      this.getExpenditures();
    }
  }

  getExpenditures(): void {
    const expenditureIds: number[] = [];
    this.operations.forEach((operation) => {
      if (operation.expenditureId) {
        if (
          expenditureIds.find((id) => id === operation.expenditureId) ===
          undefined
        ) {
          expenditureIds.push(operation.expenditureId);
        }
      }
    });

    this.expenditures = [];
    if (expenditureIds.length > 0) {
      this.expenditureApi.getExactExpenditures(expenditureIds).subscribe({
        next: (expenditures) => {
          this.expenditures = expenditures;
          this.isLoading = false;
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  selectOperation(operation: Operation) {
    if (this.selectedOperation != operation) {
      this.selectedOperation = operation;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/operations/new']);
  }

  onEditRequest() {
    this.router.navigate(['/operations', this.selectedOperation?.id]);
  }

  onFiltersRequest() {
    this.filterShow = !this.filterShow;
  }
}
