import { CovalentLayoutModule, CovalentStepsModule /*, any other modules */ } from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdSidenavModule, MdListModule, MdGridListModule } from '@angular/material';
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {routing} from './app.routing';
import { MaterialModule, MdNativeDateModule} from '@angular/material';
import { CovalentDataTableModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { SpinnerInterceptor} from './services/spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentHttpModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdInputModule, 
    MdButtonModule, 
    MdCardModule, 
    MdMenuModule, 
    MdToolbarModule, 
    MdIconModule,
    MdListModule,
    MdGridListModule,
    routing,
    MaterialModule,
    MdNativeDateModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
