import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseComponent} from './course.component';
import { MdInputModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdSidenavModule, MdListModule, MdGridListModule } from '@angular/material';
import { CourseService} from '../services/course.service';
import { AuthHeaderService } from '../services/auth-header.service';
import { ConfigurationService } from '../services/tirelo.config.service'
import {routing} from './course.routing';
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
    MdGridListModule
  ],
  declarations: [CourseComponent],
  providers: [
          CourseService,
          AuthHeaderService,
          ConfigurationService
  ],
})
export class CourseModule { }
