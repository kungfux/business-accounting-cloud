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
import { AuthComponent } from './components/auth/auth.component';
import { UsersComponent } from './components/pages/users/users/users.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { UserComponent } from './components/pages/users/user/user.component';
import { CompaniesComponent } from './components/pages/companies/companies/companies.component';
import { CompanyComponent } from './components/pages/companies/company/company.component';
import { ToolbarComponent } from './components/common/toolbar/toolbar.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/:id', component: CompanyComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AuthComponent,
    UsersComponent,
    DashboardComponent,
    UserComponent,
    CompaniesComponent,
    CompanyComponent,
    ToolbarComponent,
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
