import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRU from '@angular/common/locales/ru';
import localeUA from '@angular/common/locales/ru-UA';
import { ImageToDataUrlModule } from 'ngx-image2dataurl';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/pages/login/login.component';
import { UsersComponent } from './components/pages/users/users/users.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { UserComponent } from './components/pages/users/user/user.component';
import { CompaniesComponent } from './components/pages/companies/companies/companies.component';
import { CompanyComponent } from './components/pages/companies/company/company.component';
import { ToolbarComponent } from './components/common/toolbar/toolbar.component';
import { SwitchComponent } from './components/pages/companies/switch/switch.component';
import { TitlesComponent } from './components/pages/titles/titles/titles.component';
import { TitleComponent } from './components/pages/titles/title/title.component';
import { PropertyComponent } from './components/pages/property/property/property.component';
import { PropertiesComponent } from './components/pages/property/properties/properties.component';
import { ExpenditureComponent } from './components/pages/expenditure/expenditure/expenditure.component';
import { ExpendituresComponent } from './components/pages/expenditure/expenditures/expenditures.component';
import { ChangePasswordComponent } from './components/pages/users/change-password/change-password.component';
import { ProfileComponent } from './components/pages/users/profile/profile.component';
import { DialogComponent } from './components/dialogs/dialog/dialog.component';
import { DeleteDialogComponent } from './components/dialogs/delete/delete.component';
import { UserPreferencesService } from './services/userPreferences.service';
import { AlertDialogComponent } from './components/dialogs/alert/alert.component';
import { ContactsComponent } from './components/pages/contacts/contacts/contacts.component';
import { NotAuthorizedUserGuard } from './guards/not-authorized-user-guard';
import { AuthorizedUserGuard } from './guards/authorized-user-guard.guard';
import { AdminUserGuard } from './guards/admin-user-guard.guard';
import { ContactComponent } from './components/pages/contacts/contact/contact.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthorizedUserGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthorizedUserGuard, AdminUserGuard],
  },
  {
    path: 'users/:id',
    component: UserComponent,
    canActivate: [AuthorizedUserGuard, AdminUserGuard],
  },
  {
    path: 'users/:id/password',
    component: ChangePasswordComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthorizedUserGuard, AdminUserGuard],
  },
  {
    path: 'companies/switch',
    component: SwitchComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'companies/:id',
    component: CompanyComponent,
    canActivate: [AuthorizedUserGuard, AdminUserGuard],
  },
  {
    path: 'titles',
    component: TitlesComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'titles/:id',
    component: TitleComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'properties',
    component: PropertiesComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'properties/:id',
    component: PropertyComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'expenditures',
    component: ExpendituresComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'expenditures/:id',
    component: ExpenditureComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'contacts/:id',
    component: ContactComponent,
    canActivate: [AuthorizedUserGuard],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    UsersComponent,
    DashboardComponent,
    UserComponent,
    CompaniesComponent,
    CompanyComponent,
    ToolbarComponent,
    SwitchComponent,
    TitlesComponent,
    TitleComponent,
    PropertyComponent,
    PropertiesComponent,
    ExpenditureComponent,
    ExpendituresComponent,
    ChangePasswordComponent,
    ProfileComponent,
    DialogComponent,
    DeleteDialogComponent,
    AlertDialogComponent,
    ContactsComponent,
    ContactComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    ImageToDataUrlModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    DialogComponent,
    {
      provide: LOCALE_ID,
      deps: [UserPreferencesService],
      useFactory: (userPreferences: any) => userPreferences.locale,
    },
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeRU);
    registerLocaleData(localeUA);
  }
}
