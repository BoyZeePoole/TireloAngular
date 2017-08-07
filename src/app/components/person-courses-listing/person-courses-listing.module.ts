import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CovalentLayoutModule, CovalentStepsModule /*, any other modules */ } from '@covalent/core';
import { MdInputModule} from '@angular/material';
import { MaterialModule} from '@angular/material';
import { CovalentDataTableModule } from '@covalent/core';
import { CovalentSearchModule } from '@covalent/core';
import { CovalentPagingModule } from '@covalent/core';
import { PersonCoursesListingComponent } from './person-courses-listing.component';

@NgModule({
    declarations:[PersonCoursesListingComponent],
    exports: [PersonCoursesListingComponent],
imports: [
    CommonModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    MaterialModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    FormsModule
  ],
  providers: []
})

export class PersonCoursesListingModule{}