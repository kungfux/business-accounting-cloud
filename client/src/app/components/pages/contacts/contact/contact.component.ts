import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CurrencyService } from 'src/app/services/converters/currency.service';
import { UserPreferencesService } from 'src/app/services/userPreferences.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../detailsPage.css', './contact.component.css'],
})
export class ContactComponent implements OnInit {
  item: Contact = new Contact();
  titles?: Title[];
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

  fileToUpload: File | null = null;

  choosePhotoButton: CustomButton = new CustomButton(
    'Выбрать фото',
    'photo_camera'
  );

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('file') fileInput: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    private contactApi: ContactApiService,
    private titleApi: TitleApiService,
    private userPreferences: UserPreferencesService,
    public currency: CurrencyService
  ) {}

  ngOnInit(): void {
    this.titleApi.getTitles(this.userPreferences.companyId!).subscribe({
      next: (titles) => {
        this.titles = titles;

        const id = this.route.snapshot.paramMap.get('id');
        if (id === null) {
          return;
        }
        const contactId = parseInt(id);
        if (!contactId) {
          this.isLoading = false;
        } else {
          this.contactApi.getContact(contactId).subscribe({
            next: (contact) => {
              this.item = contact;
              this.isLoading = false;
            },
          });
        }
      },
    });
  }

  onSaveRequest() {
    this.isLoading = true;
    const contact = new Contact({
      id: this.item.id,
      name: this.item.name,
      phone: this.item.phone,
      cellphone: this.item.cellphone,
      email: this.item.email,
      address: this.item.address,
      passport: this.item.passport,
      dob: this.item.dob,
      note: this.item.note,
      hired: this.item.hired,
      fired: this.item.fired,
      firedNote: this.item.firedNote,
      photo: this.item.photo,
      title: this.item.title,
      companyId: this.userPreferences.companyId,
    });

    if (!contact.id) {
      this.contactApi.addContact(contact).subscribe({
        next: () => {
          this.navigateToAllContacts();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.contactApi.updateContact(contact.id, contact).subscribe({
        next: () => {
          this.navigateToAllContacts();
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  onDeleteRequest() {
    this.isLoading = true;
    this.contactApi.deleteContact(this.item.id!).subscribe({
      next: () => {
        this.navigateToAllContacts();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  handleFileInput(event: any | null) {
    const selectedFile = event?.target.files[0];
    if (selectedFile.type && !selectedFile.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.item.photo = e?.target?.result as string;
    };

    reader.readAsDataURL(selectedFile);
  }

  onChoosePhotoRequest() {
    this.fileInput.nativeElement.click();
  }

  private navigateToAllContacts(): void {
    this.router.navigate(['/contacts']);
  }
}
