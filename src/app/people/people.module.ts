import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PeopleComponent} from './people.component';
import { MdInputModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdSidenavModule, MdListModule, MdGridListModule } from '@angular/material';
import { RoleService} from '../services/role.service';
import { PersonService} from '../services/person.service';
import { AuthHeaderService } from '../services/auth-header.service';
import { ConfigurationService } from '../services/tirelo.config.service'
import {routing} from './people.routing';
import { MaterialModule} from '@angular/material';
import { CovalentDataTableModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { PersonCoursesListingModule } from '../components/person-courses-listing/person-courses-listing.module';

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
    CovalentPagingModule,
    PersonCoursesListingModule
  ],
  declarations: [PeopleComponent],
  providers: [
          RoleService,
          PersonService,
          AuthHeaderService,
          ConfigurationService,
  ],
})
export class PeopleModule { }
