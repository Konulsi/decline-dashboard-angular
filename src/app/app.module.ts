import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeclineListComponent } from './pages/decline-list/decline-list.component';
import { DeclineDetailComponent } from './pages/decline-detail/decline-detail.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatDateFormats } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { KeysPipe } from './keys.pipe';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    DeclineListComponent,
    DeclineDetailComponent,
    HeaderComponent,
    KeysPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    RouterModule,
    NgxPaginationModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [provideMomentDateAdapter(MY_DATE_FORMATS), DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
