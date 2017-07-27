import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoursesComponent} from './courses.component';
import { MdInputModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdSidenavModule, MdListModule, MdGridListModule } from '@angular/material';
import { CourseService} from '../services/course.service';
import { AuthHeaderService } from '../services/auth-header.service';
import { ConfigurationService } from '../services/tirelo.config.service'
import {routing} from './courses.routing';
import { MaterialModule} from '@angular/material';
import { CovalentDataTableModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule
  ],
  declarations: [CoursesComponent],
  providers: [
          CourseService,
          AuthHeaderService,
          ConfigurationService
  ],
})
export class CoursesModule { }
