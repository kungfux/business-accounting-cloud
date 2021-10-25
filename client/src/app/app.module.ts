import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
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
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';

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
import { TitlesComponent } from './components/pages/contacts/titles/titles/titles.component';
import { TitleComponent } from './components/pages/contacts/titles/title/title.component';
import { PropertyComponent } from './components/pages/property/property/property.component';
import { PropertiesComponent } from './components/pages/property/properties/properties.component';
import { ExpenditureComponent } from './components/pages/expenditure/expenditure/expenditure.component';
import { ExpendituresComponent } from './components/pages/expenditure/expenditures/expenditures.component';
import { ChangePasswordComponent } from './components/pages/users/change-password/change-password.component';
import { ProfileComponent } from './components/pages/users/profile/profile.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserComponent },
  { path: 'users/:id/password', component: ChangePasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'titles', component: TitlesComponent },
  { path: 'titles/:id', component: TitleComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/switch', component: SwitchComponent },
  { path: 'companies/:id', component: CompanyComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'properties/:id', component: PropertyComponent },
  { path: 'expenditures', component: ExpendituresComponent },
  { path: 'expenditures/:id', component: ExpenditureComponent },
  { path: '**', redirectTo: '/' },
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
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
