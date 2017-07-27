import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonComponent} from './person.component';
import { MdInputModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MdSidenavModule, MdListModule, MdGridListModule } from '@angular/material';
import { RoleService} from '../services/role.service';
import { PersonService} from '../services/person.service';
import { AuthHeaderService } from '../services/auth-header.service';
import { ConfigurationService } from '../services/tirelo.config.service'
import {routing} from './person.routing';
import { MaterialModule} from '@angular/material';

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
    MaterialModule
  ],
  declarations: [PersonComponent],
  providers: [
          RoleService,
          PersonService,
          AuthHeaderService,
          ConfigurationService
  ],
})
export class PersonModule { }
