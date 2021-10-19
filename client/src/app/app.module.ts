import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthComponent } from './components/auth/auth.component';
import { UsersComponent } from './components/users/users/users.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AuthComponent,
    UsersComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false }),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTableModule,
    MatExpansionModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
