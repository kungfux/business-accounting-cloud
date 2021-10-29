import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ToolBarMode } from 'src/app/components/common/toolbar/toolbar.component';
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
  pageIndex: number = 1;

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
    this.loadData();
  }

  loadData(pageIndex: number = this.pageIndex): void {
    this.isLoading = true;
    this.contactApi
      .getContacts(this.userPreferences.companyId, (pageIndex - 1) * 10)
      .subscribe({
        next: (data) => {
          this.data = data;
          this.isLoading = false;
          this.pageIndex = pageIndex;
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
}
