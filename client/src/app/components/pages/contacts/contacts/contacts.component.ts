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
import { Title } from 'src/app/services/api/models/title';
import { TitleApiService } from 'src/app/services/api/title.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css', '../../listPage.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  titles: Title[] = [];
  selectedContact?: Contact;
  toolBarMode: ToolBarMode = ToolBarMode.List;
  isLoading = true;

  filtersButton: CustomButton = new CustomButton('Фильтр', 'filter_alt');
  filterShow: boolean = false;
  filterActiveOnly: boolean = true;
  filterContactName: string | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    public userPreferences: UserPreferencesService,
    private breakpointObserver: BreakpointObserver,
    private contactApi: ContactApiService,
    private titleApi: TitleApiService,
    private router: Router
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
        next: (contacts) => {
          this.contacts = contacts;
          this.getTitles();
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

  selectContact(contact: Contact) {
    if (this.selectedContact != contact) {
      this.selectedContact = contact;
    } else {
      this.onEditRequest();
    }
  }

  onCreateRequest() {
    this.router.navigate(['/contacts/new']);
  }

  onEditRequest() {
    this.router.navigate(['/contacts', this.selectedContact?.id]);
  }

  onFiltersRequest() {
    this.filterShow = !this.filterShow;
  }
}
