import { Injectable } from '@angular/core';
import { EndPoints } from './tirelo-settings';
import {Http, Response, URLSearchParams, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs';
import './rxjs-operators';
import { AuthHeaderService } from './auth-header.service';
import { ConfigurationService } from './tirelo.config.service'
@Injectable()
export class CourseService {


  constructor(private http: Http,
              private authHeaderService: AuthHeaderService,
              private configService: ConfigurationService) { }

  getCourses() {
    let endpoint = this.configService.RootUrl() + EndPoints.getCourses;
    return this.http
      .get(endpoint, {headers: this.authHeaderService.getHeaders()})
      .map(response => {
        return response.json();
      })
      .catch(err => {
        return Observable.throw(err);
      });
  }
   
  getPersonCourses(id: string) : Observable <any>{
    let endpoint = this.configService.RootUrl() + EndPoints.getPersonCourses;
    let options = new RequestOptions({headers: this.authHeaderService.getHeaders()});
    let params: URLSearchParams  = new URLSearchParams();
    params.append('id',id);
    options.search = params;
    return this.http
      .get(endpoint, options)
      .map(response => {
        return response.json();
      })
      .catch(err => {
        return Observable.throw(err);
      });
  }
  getCourse(Id: string) : Observable<any> {
    let endpoint = this.configService.RootUrl() + EndPoints.getCourse;
    let options = new RequestOptions({headers: this.authHeaderService.getHeaders()});
    let params: URLSearchParams  = new URLSearchParams();
    params.append('id', Id);
    options.search = params;

     return this.http
      .get(endpoint, options)
      //.flatMap((response) => response.json())
      .map((response) => {
        return response.json()
      })
      .catch(this.handleError);
    
  }
  upsertCourse(course) : Observable <boolean> {
    let endpoint = this.configService.RootUrl() + EndPoints.setCourse;
    let payload = new URLSearchParams();
    if(course.Id) {
      payload.append('Id', course.Id);
    }
    payload.append('Name', course.Name);
    payload.append('ValidPeriod', course.ValidPeriod);
    return this.http
        .post(endpoint, payload.toString(), {headers: this.authHeaderService.getHeaders()})
        .map((response: Response) => {
          return Observable.of(true);
        })
        .catch(this.handleError);
  }

  upsertPersonCourse(personCourse) : Observable <boolean> {
    let endpoint = this.configService.RootUrl() + EndPoints.setCoursePerson;

    let _headers = this.authHeaderService.getHeaders();
    _headers.delete('Content-Type');
    _headers.append('Content-Type', 'application/json');

    return this.http
        .post(endpoint, JSON.stringify(personCourse), {headers: _headers})
        .map((response: Response) => {
          return Observable.of(true);
        })
        .catch(this.handleError);
  }


  deletePersonCourse(ids: string[]) : Observable <boolean> {
    let endpoint = this.configService.RootUrl() + EndPoints.deletePersonCourses;
    let _headers = this.authHeaderService.getHeaders();
    _headers.delete('Content-Type');
    _headers.append('Content-Type', 'application/json');
    
     return this.http
      .post(endpoint, JSON.stringify(ids), {headers: _headers})     
      //.flatMap((response) => response.json())
      .map((response) => {
        return response.json()
      })
      .catch(this.handleError);
    
  }
  private handleError(error: Response | any) {
    if (error instanceof Response) {
      return Observable.throw(error);
    } else {
      return Observable.throw(error);
    }
  }
}

