import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageResult, Options } from 'ngx-image2dataurl';
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
  contact: Contact = new Contact();
  titles: Title[] = [];
  toolBarMode: ToolBarMode = ToolBarMode.Details;
  isLoading = true;

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

  options: Options = {
    resize: {
      maxHeight: 500,
      maxWidth: 750,
    },
    allowedExtensions: ['JPG', 'PNG'],
  };

  @ViewChild('imageUpload') imageUpload: any;

  constructor(
    public currency: CurrencyService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    private contactApi: ContactApiService,
    private titleApi: TitleApiService,
    private userPreferences: UserPreferencesService,
    private dateAdapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.dateAdapter.setLocale(this.userPreferences.locale);
    this.getTitles();
  }

  getContact(): void {
    const contactId: number = parseInt(this.route.snapshot.paramMap.get('id')!);

    if (contactId) {
      this.isLoading = true;
      this.contactApi.getContact(contactId).subscribe({
        next: (contact) => {
          if (contact.titleId) {
            if (
              this.titles?.find((x) => x.id === contact.titleId) === undefined
            ) {
              this.getTitles(contact.titleId);
            }
          }
          this.contact = contact;
          this.isLoading = false;
        },
      });
    }
  }

  getTitles(id: number | undefined = undefined): void {
    this.isLoading = true;
    if (id) {
      this.titleApi.getTitle(id).subscribe({
        next: (title) => {
          this.titles?.splice(0, 0, title);
          this.titles?.sort((x, y) => x.name!.localeCompare(y.name!));
          this.isLoading = false;
        },
      });
    } else {
      this.titleApi
        .getEnabledTitles(this.userPreferences.companyId!)
        .subscribe({
          next: (titles) => {
            this.titles = titles;
            this.titles?.sort((x, y) => x.name!.localeCompare(y.name!));
            this.isLoading = false;
            this.getContact();
          },
        });
    }
  }

  onSaveRequest() {
    this.isLoading = true;
    const contact = new Contact({
      id: this.contact.id,
      name: this.contact.name,
      phone: this.contact.phone,
      cellphone: this.contact.cellphone,
      email: this.contact.email,
      address: this.contact.address,
      passport: this.contact.passport,
      dob: this.contact.dob,
      note: this.contact.note,
      hired: this.contact.hired,
      fired: this.contact.fired,
      firedNote: this.contact.firedNote,
      photo: this.contact.photo,
      titleId: this.contact.titleId,
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
    this.contactApi.deleteContact(this.contact.id!).subscribe({
      next: () => {
        this.navigateToAllContacts();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  onImageSelected(imageResult: ImageResult) {
    if (imageResult.error) alert(imageResult.error);
    this.contact.photo =
      (imageResult.resized && imageResult.resized.dataURL) ||
      imageResult.dataURL!;
  }

  onChoosePhotoRequest() {
    this.imageUpload.nativeElement.click();
  }

  private navigateToAllContacts(): void {
    this.router.navigate(['/contacts']);
  }
}
