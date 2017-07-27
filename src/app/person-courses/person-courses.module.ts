import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonCoursesComponent} from './person-courses.component';
import { MdInputModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdSidenavModule, MdListModule, MdGridListModule } from '@angular/material';
import { PersonService} from '../services/person.service';
import { CourseService } from '../services/course.service';
import { AuthHeaderService } from '../services/auth-header.service';
import { ConfigurationService } from '../services/tirelo.config.service'
import {routing} from './person-courses.routing';
import { MaterialModule, DateAdapter, MD_DATE_FORMATS} from '@angular/material';
import { APP_DATE_FORMATS } from '../mods/app.date-constants';
import { AppDateAdapter} from '../mods/app.date-adapter';
import { PersonCoursesListingComponent } from '../components/person-courses-listing/person-courses-listing.component';
import { CovalentDataTableModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing,
    MdInputModule, 
    MdButtonModule, 
    MdCardModule, 
    MdMenuModule, 
    MdToolbarModule, 
    MdIconModule,
    MdListModule,
    MdGridListModule,
    MaterialModule,
    MdDatepickerModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule
  ],
  declarations: [PersonCoursesComponent, PersonCoursesListingComponent],
  providers: [
          PersonService,
          CourseService,
          AuthHeaderService,
          ConfigurationService,
          {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MD_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
  ],
})
export class PersonCoursesModule { }
