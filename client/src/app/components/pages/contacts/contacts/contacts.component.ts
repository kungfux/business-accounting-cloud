import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  CustomButton,
  ToolBarMode,
} from 'src/app/components/common/toolbar/toolbar.component';
import { ContactApiService } from 'src/app/services/api/contact.service';
import { Contact } from 'src/app/services/api/models/contact';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css', '../../listPage.css'],
})
export class ContactsComponent implements OnInit {
  data: Contact[] = [];
  selectedItem?: Contact;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;

  filterShow: boolean = false;
  filterActiveOnly: boolean = true;
  filterContactName: string | null = null;

  filtersButton: CustomButton = new CustomButton('Фильтр', 'filter_alt');

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private contactApi: ContactApiService,
    private router: Router,
    public userPreferences: UserPreferencesService
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(offset: number = 0): void {
    this.isLoading = true;
    this.contactApi
      .getContacts(
        this.userPreferences.companyId!,
        this.filterActiveOnly,
        offset
      )
      .subscribe({
        next: (data) => {
          this.data = data;
          this.isLoading = false;
        },
      });
  }

  selectItem(item: Contact) {
    if (this.selectedItem != item) {
      this.selectedItem = item;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/contacts/new']);
  }

  onEditRequest() {
    this.router.navigate(['/contacts', this.selectedItem?.id]);
  }

  onFiltersRequest() {
    this.filterShow = !this.filterShow;
  }
}
