import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MdInputModule, MdGridListModule, DateAdapter, NativeDateAdapter} from '@angular/material';
import {CourseService} from '../services/course.service';
import {PersonService} from '../services/person.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-courses',
  templateUrl: './person-courses.component.html',
  styleUrls: ['./person-courses.component.scss']
})
export class PersonCoursesComponent implements OnInit {
  personCourseForm : FormGroup;
  public courseData: any;
  selectedPersonId: any;
  selectedCourse: any;
  personCourseChildData: any;
  public personCourseModel= {
    Id: null,
    DateRegistered: '',
    DateCompleted: '',
    Employee: {
      Id: ''      
    },
    Course: {
      Id: '',
    }
  }
public pageProperties = {
    Title: 'Person',
    ActionButton: {
      Submit: 'Submit',
      Back: 'Back'
    }
  }

  constructor(private fb: FormBuilder, 
              private courseService: CourseService,
              private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router,
              dateAdapter: DateAdapter<NativeDateAdapter>) { 
                dateAdapter.setLocale('en-GB');
                this.getCourses();
                this.createForm();
              }

  ngOnInit() {
      this.route.params.subscribe(params => {
      this.selectedPersonId = params['Id'];
      if(this.selectedPersonId) {        
        this.personService.getPerson(this.selectedPersonId)
          .subscribe(
            person => {
              this.pageProperties.Title =  `${person.Initials} - ${person.Surname}`;
              this.pageProperties.ActionButton.Submit = 'Submit';
              this.getPersonCourses(this.selectedPersonId);
            },
            error => {
              //this.popToast('error', 'Error', this.errorService.displayError(error));
            });
      }
      else {
       
      }
    });
  }
  getCourses() {
     this.courseService.getCourses()
       .subscribe(
         courses => {
           this.courseData = courses;
         },
         error => {
           //his.popToast('error', 'Error', this.errorService.displayError(error));
         });
  }
  createForm() {
    this.personCourseForm = this.fb.group({
    course: ['', Validators.required],
    dateCompleted: null,
    dateRegistered:null,
    })
  }
  addPersonCourses(formValues):void {
     if (this.personCourseForm.invalid) return;
     this.personCourseModel.Course.Id = this.selectedCourse;
     this.personCourseModel.Employee.Id = this.selectedPersonId;
     this.personCourseModel.DateCompleted =  this.convertDate(formValues.dateCompleted);
     this.personCourseModel.DateRegistered = this.convertDate(formValues.dateRegistered);
     this.courseService.upsertPersonCourse(this.personCourseModel)
     .subscribe(
      success => {
        //this.popToast('success', 'Success', this.popupMessage);
              this.getPersonCourses(this.selectedPersonId);
      },
      error => {
        //this.errorMessage = error;
        //this.popToast('error', 'Error', this.errorService.displayError(error));
      }); 
  }

  convertDate(date) : string {
    return date ? new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate() : '';
  }

  getPersonCourses(id: string) : void {
    this.courseService.getPersonCourses(id)
      .subscribe(
        people => {
          this.personCourseChildData = people;
        },
        error => {
          //his.popToast('error', 'Error', this.errorService.displayError(error));
        });
  }


}
