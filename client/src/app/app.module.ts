import { LayoutModule } from '@angular/cdk/layout';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRU from '@angular/common/locales/ru';
import localeUA from '@angular/common/locales/ru-UA';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ImageToDataUrlModule } from 'ngx-image2dataurl';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './components/common/navigator/navigator.component';
import { ToolbarComponent } from './components/common/toolbar/toolbar.component';
import { AlertDialogComponent } from './components/dialogs/alert/alert.component';
import { DeleteDialogComponent } from './components/dialogs/delete/delete.component';
import { DialogComponent } from './components/dialogs/dialog/dialog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CompaniesComponent } from './components/pages/companies/companies/companies.component';
import { CompanyComponent } from './components/pages/companies/company/company.component';
import { SwitchComponent } from './components/pages/companies/switch/switch.component';
import { ContactComponent } from './components/pages/contacts/contact/contact.component';
import { ContactsComponent } from './components/pages/contacts/contacts/contacts.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ExpenditureComponent } from './components/pages/expenditure/expenditure/expenditure.component';
import { ExpendituresComponent } from './components/pages/expenditure/expenditures/expenditures.component';
import { IncomeComponent } from './components/pages/incomes/income/income.component';
import { IncomesComponent } from './components/pages/incomes/incomes/incomes.component';
import { LoginComponent } from './components/pages/login/login.component';
import { OperationComponent } from './components/pages/operations/operation/operation.component';
import { OperationsComponent } from './components/pages/operations/operations/operations.component';
import { PropertiesComponent } from './components/pages/property/properties/properties.component';
import { PropertyComponent } from './components/pages/property/property/property.component';
import { TitleComponent } from './components/pages/titles/title/title.component';
import { TitlesComponent } from './components/pages/titles/titles/titles.component';
import { ChangePasswordComponent } from './components/pages/users/change-password/change-password.component';
import { ProfileComponent } from './components/pages/users/profile/profile.component';
import { UserComponent } from './components/pages/users/user/user.component';
import { UsersComponent } from './components/pages/users/users/users.component';
import { CompanyAgeComponent } from './components/widgets/company-age/company-age.component';
import { CompanyTotalMonthComponent } from './components/widgets/company-total-month/company-total-month.component';
import { CompanyTotalOverallComponent } from './components/widgets/company-total-overall/company-total-overall.component';
import { CompanyTotalYearComponent } from './components/widgets/company-total-year/company-total-year.component';
import { WidgetComponent } from './components/widgets/widget/widget.component';
import { AdminUserGuard } from './guards/admin-user-guard.guard';
import { AuthorizedUserGuard } from './guards/authorized-user-guard.guard';
import { NotAuthorizedUserGuard } from './guards/not-authorized-user-guard';
import { ContactPipe } from './pipes/contact';
import { ExpenditurePipe } from './pipes/expenditure';
import { IncomePipe } from './pipes/income';
import { PropertyPipe } from './pipes/property';
import { TitlePipe } from './pipes/title';
import { UserPreferencesService } from './services/userPreferences.service';
import { UserAccessComponent } from './components/pages/users/user-access/user-access.component';

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
    path: 'users/:id/access',
    component: UserAccessComponent,
    canActivate: [AdminUserGuard],
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
    path: 'incomes',
    component: IncomesComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'incomes/:id',
    component: IncomeComponent,
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
  {
    path: 'operations',
    component: OperationsComponent,
    canActivate: [AuthorizedUserGuard],
  },
  {
    path: 'operations/:id',
    component: OperationComponent,
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
    NavigatorComponent,
    OperationsComponent,
    TitlePipe,
    ContactPipe,
    PropertyPipe,
    ExpenditurePipe,
    IncomePipe,
    IncomesComponent,
    IncomeComponent,
    WidgetComponent,
    CompanyAgeComponent,
    CompanyTotalOverallComponent,
    CompanyTotalYearComponent,
    CompanyTotalMonthComponent,
    OperationComponent,
    UserAccessComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
    ImageToDataUrlModule,
    MatSortModule,
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
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    MatDatepickerModule,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeRU);
    registerLocaleData(localeUA);
  }
}
