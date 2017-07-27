import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import {MdInputModule, MdGridListModule} from '@angular/material';
import {CourseService} from '../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
courseForm: FormGroup;
selectedCourseId: string;

  public courseModel = {
    Id: '',   
    Name: '',
    ValidPeriod: 12
  };

  public pageProperties = {
    Title: 'Add Course',
    ActionButton: 'Add Course'
  }

  constructor(private fb: FormBuilder,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router) {
                this.createCourseForm();
               }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedCourseId = params['Id'];
      if(this.selectedCourseId) {        
        this.courseService.getCourse(this.selectedCourseId)
          .subscribe(
            person => {
              this.courseModel = person;
              this.pageProperties.Title = `Edit : ${this.courseModel.Name}`;
              this.pageProperties.ActionButton = 'Update';
            },
            error => {
              //this.popToast('error', 'Error', this.errorService.displayError(error));
            });
      }
      else {
       
      }
    });
  }
  createCourseForm() {
      this.courseForm = this.fb.group({
        'id': null,
        'courseName': [null, Validators.required],
        'validPeriod' : [null, Validators.required]
      })
   }
  addCourse(formValues) : void {
    if (this.courseForm.invalid) return;
    this.courseModel.Name = formValues.courseName;
    this.courseModel.ValidPeriod = formValues.validPeriod;
    this.courseService.upsertCourse(this.courseModel)
    .subscribe(
      success => {
        //this.popToast('success', 'Success', this.popupMessage);
        this.router.navigate(['/courses']);
      },
      error => {
        //this.errorMessage = error;
        //this.popToast('error', 'Error', this.errorService.displayError(error));
      });    

    }

}
