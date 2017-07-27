import { Injectable } from '@angular/core';
import { EndPoints } from './tirelo-settings';
import {Http, Response, URLSearchParams, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import './rxjs-operators';
import { AuthHeaderService } from './auth-header.service';
import { ConfigurationService } from './tirelo.config.service'
@Injectable()
export class RoleService {


  constructor(private http: Http,
              private authHeaderService: AuthHeaderService,
              private configService: ConfigurationService) { }

  getRoles() {
    let endpoint = this.configService.RootUrl() + EndPoints.getAllRoles;
    return this.http
      .get(endpoint, {headers: this.authHeaderService.getHeaders()})
      .map(response => {
        return response.json();
      })
      .catch(err => {
        return Observable.throw(err);
      });
  }
          
  getRole(Id: string) : Observable<any> {
    let endpoint = this.configService.RootUrl() + EndPoints.getRole;
    let options = new RequestOptions({headers: this.authHeaderService.getHeaders()});
    let params: URLSearchParams  = new URLSearchParams();
    params.append('id', Id);
    options.search = params;

     return this.http
      .get(endpoint, options)
      .map(response => {
        return response.json()
      })
      .catch(this.handleError);
    
  }
  upsertRole(role) : Observable <boolean> {
    let endpoint = this.configService.RootUrl() + EndPoints.setRole;
    let payload = new URLSearchParams();
    if(role.Id) {
      payload.append('Id', role.Id);
    }
    payload.append('RoleName', role.RoleName);
    return this.http
        .post(endpoint, payload.toString(), {headers: this.authHeaderService.getHeaders()})
        .map((response: Response) => {
          return Observable.of(true);
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

