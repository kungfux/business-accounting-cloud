import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
import { ContactApiService } from 'src/app/services/api/contact.service';
import { ExpenditureApiService } from 'src/app/services/api/expenditure.service';
import { IncomeApiService } from 'src/app/services/api/income.service';
import { Contact } from 'src/app/services/api/models/contact';
import { Expenditure } from 'src/app/services/api/models/expenditure';
import { Income } from 'src/app/services/api/models/income';
import { Operation } from 'src/app/services/api/models/operation';
import { Property } from 'src/app/services/api/models/property';
import { Title } from 'src/app/services/api/models/title';
import { OperationApiService } from 'src/app/services/api/operation.service';
import { PropertyApiService } from 'src/app/services/api/property.service';
import { TitleApiService } from 'src/app/services/api/title.service';
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['../../detailsPage.css', './operation.component.css'],
})
export class OperationComponent implements OnInit {
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;
  operationDescription: string = 'Новая операция';
  operation: Operation = new Operation();
  operationType?: string;
  contacts: Contact[] = [];
  titles: Title[] = [];
  properties: Property[] = [];
  incomes: Income[] = [];
  expenditures: Expenditure[] = [];

  constructor(
    public currency: CurrencyService,
    private route: ActivatedRoute,
    private router: Router,
    private userPreferences: UserPreferencesService,
    private operationApi: OperationApiService,
    private contactApi: ContactApiService,
    private titleApi: TitleApiService,
    private propertyApi: PropertyApiService,
    private incomeApi: IncomeApiService,
    private expenditureApi: ExpenditureApiService,
    private dateAdapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.dateAdapter.setLocale(this.userPreferences.locale);
    this.getOperationDetails();
  }

  getOperationDetails(): void {
    const operationId: number = parseInt(
      this.route.snapshot.paramMap.get('id')!
    );
    if (!operationId) {
      this.operationType = 'income';
      this.getIncomes();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.operation.operationDate = yesterday;
      return;
    }

    this.operationApi.getOperation(operationId).subscribe({
      next: (operation) => {
        this.operation = operation;
        this.operationDescription = `Операция #${operation.id}`;
        if (this.operation.contactId) {
          this.getContacts(this.operation.contactId);
          this.operationType = 'contact';
          return;
        }
        if (this.operation.propertyId) {
          this.getProperties(this.operation.propertyId);
          this.operationType = 'property';
          return;
        }
        if (this.operation.incomeId) {
          this.getIncomes(this.operation.incomeId);
          this.operationType = 'income';
          return;
        }
        if (this.operation.expenditureId) {
          this.getExpenditures(this.operation.expenditureId);
          this.operationType = 'expenditure';
          return;
        }

        this.isLoading = false;
        this.operationType = 'income';
        this.getIncomes();
      },
    });
  }

  getContacts(id?: number): void {
    this.isLoading = true;
    this.contactApi
      .getEnabledContacts(this.userPreferences.companyId!)
      .subscribe({
        next: (contacts) => {
          this.contacts = contacts;
          this.contacts?.sort((x, y) => x.name!.localeCompare(y.name!));

          if (
            id &&
            this.contacts?.find((contact) => contact.id === id) === undefined
          ) {
            this.contactApi.getContact(id).subscribe({
              next: (contact) => {
                this.contacts.push(contact);
                this.contacts?.sort((x, y) => x.name!.localeCompare(y.name!));
                this.getTitles();
              },
            });
          } else {
            this.getTitles();
          }
        },
      });
  }

  getIncomes(id?: number): void {
    this.isLoading = true;
    this.incomeApi
      .getEnabledIncomes(this.userPreferences.companyId!)
      .subscribe({
        next: (incomes) => {
          this.incomes = incomes;
          this.incomes?.sort((x, y) => x.title!.localeCompare(y.title!));

          if (
            id &&
            this.incomes?.find((income) => income.id === id) === undefined
          ) {
            this.incomeApi.getIncome(id).subscribe({
              next: (income) => {
                this.incomes.push(income);
                this.incomes?.sort((x, y) => x.title!.localeCompare(y.title!));
                this.isLoading = false;
              },
            });
          } else {
            this.isLoading = false;
          }
        },
      });
  }

  getProperties(id?: number): void {
    this.isLoading = true;
    this.propertyApi
      .getEnabledProperties(this.userPreferences.companyId!)
      .subscribe({
        next: (properties) => {
          this.properties = properties;
          this.properties?.sort((x, y) => x.title!.localeCompare(y.title!));

          if (
            id &&
            this.properties?.find((property) => property.id === id) ===
              undefined
          ) {
            this.propertyApi.getProperty(id).subscribe({
              next: (property) => {
                this.properties.push(property);
                this.properties?.sort((x, y) =>
                  x.title!.localeCompare(y.title!)
                );
                this.isLoading = false;
              },
            });
          } else {
            this.isLoading = false;
          }
        },
      });
  }

  getExpenditures(id?: number): void {
    this.isLoading = true;
    this.expenditureApi
      .getEnabledExpenditures(this.userPreferences.companyId!)
      .subscribe({
        next: (expenditures) => {
          this.expenditures = expenditures;
          this.expenditures?.sort((x, y) => x.title!.localeCompare(y.title!));

          if (
            id &&
            this.expenditures?.find((expenditure) => expenditure.id === id) ===
              undefined
          ) {
            this.expenditureApi.getExpenditure(id).subscribe({
              next: (expenditure) => {
                this.expenditures.push(expenditure);
                this.expenditures?.sort((x, y) =>
                  x.title!.localeCompare(y.title!)
                );
                this.isLoading = false;
              },
            });
          } else {
            this.isLoading = false;
          }
        },
      });
  }

  getTitles(): void {
    this.isLoading = true;
    const titleIds: number[] = [];
    this.contacts.forEach((contact) => {
      if (contact.titleId) {
        if (titleIds.find((id) => id == contact.titleId) === undefined) {
          titleIds.push(contact.titleId);
        }
      }
    });

    this.titles = [];
    if (titleIds.length == 0) {
      this.isLoading = false;
      return;
    }

    this.titleApi.getExactTitles(titleIds).subscribe({
      next: (titles) => {
        this.titles = titles;
        this.isLoading = false;
      },
    });
  }

  onOperationTypeChange(value: any): void {
    this.operation.contactId = null;
    this.operation.propertyId = null;
    this.operation.incomeId = null;
    this.operation.expenditureId = null;

    switch (value.toString()) {
      case 'contact':
        if (this.contacts.length == 0) {
          this.getContacts();
        }
        break;
      case 'property':
        if (this.properties.length == 0) {
          this.getProperties();
        }
        break;
      case 'income':
        if (this.incomes.length == 0) {
          this.getIncomes();
        }
        break;
      case 'expenditure':
        if (this.expenditures.length == 0) {
          this.getExpenditures();
        }
        break;
    }
  }

  onAssociatedEntryChange(value: any): void {
    let amount: number | null | undefined = undefined;
    switch (this.operationType) {
      case 'contact':
        const titleId = this.contacts?.find(
          (contact) => contact.id === value
        )?.titleId;
        if (titleId) {
          amount = this.titles.find((title) => title.id === titleId)?.rate;
        }
        break;
      case 'property':
        amount = this.properties.find(
          (property) => property.id === value
        )?.cost;
        break;
      case 'income':
        amount = this.incomes.find((income) => income.id === value)?.rate;
        break;
      case 'expenditure':
        amount = this.expenditures.find(
          (expenditure) => expenditure.id === value
        )?.rate;
        break;
    }
    this.operation.amount = amount || null;
  }

  onSaveRequest() {
    this.isLoading = true;
    const operation = new Operation({
      id: this.operation.id,
      operationDate: this.operation.operationDate,
      amount: this.operation.amount,
      comment: this.operation.comment,
      contactId: this.operation.contactId,
      propertyId: this.operation.propertyId,
      incomeId: this.operation.incomeId,
      expenditureId: this.operation.expenditureId,
      companyId: this.userPreferences.companyId,
    });
    if (!operation.id) {
      this.operationApi.addOperation(operation).subscribe({
        next: () => {
          this.navigateToAllOperations();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.operationApi.updateOperation(operation.id, operation).subscribe({
        next: () => {
          this.navigateToAllOperations();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onDeleteRequest() {
    this.isLoading = true;
    this.operationApi.deleteOperation(this.operation.id!).subscribe({
      next: () => {
        this.navigateToAllOperations();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  private navigateToAllOperations(): void {
    this.router.navigate(['/operations']);
  }
}
