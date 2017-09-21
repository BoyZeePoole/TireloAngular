import { Injectable } from '@angular/core';
import { EndPoints } from './tirelo-settings';
import {Http, Response, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import './rxjs-operators';
import { AuthHeaderService } from './auth-header.service';
import { ConfigurationService } from './tirelo.config.service'

@Injectable()
export class PersonService {

  constructor(private http: Http,
              private authHeaderService: AuthHeaderService,
              private configService: ConfigurationService) { }

  upsertPerson(person) : Observable <boolean> {
    let endpoint = this.configService.RootUrl() + EndPoints.setPerson;
    let payload = new URLSearchParams();
    payload.append("Person", person);

    let _headers = this.authHeaderService.getHeaders();
    _headers.delete('Content-Type');
    _headers.append('Content-Type', 'application/json');

    return this.http
        .post(endpoint, JSON.stringify(person), {headers: _headers})
        .map((response: Response) => {
          return Observable.of(true);
        })
        .catch(this.handleError);
  }
  deletePerson(id: string) : Observable <boolean> {
    let endpoint = this.configService.RootUrl() + EndPoints.deletePerson;
    let payload = new URLSearchParams();
    payload.append("id", id);

    let _headers = this.authHeaderService.getHeaders();
    _headers.delete('Content-Type');
    _headers.append('Content-Type', 'application/json');

    return this.http
        .post(endpoint, JSON.stringify(id), {headers: _headers})
        .map((response: Response) => {
          return Observable.of(true);
        })
        .catch(this.handleError);
  }

  getPeople() : Observable<any> {
    let endpoint = this.configService.RootUrl() + EndPoints.getPeople;
    return this.http
      .get(endpoint, {headers: this.authHeaderService.getHeaders()})
      .map(response => {
        return response.json();
      })
      .catch(err => {
        return Observable.throw(err);
      });
    
  }
  
  getPerson(Id: string) : Observable<any> {
    let endpoint = this.configService.RootUrl() + EndPoints.getPerson;
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

  private handleError(error: Response | any) {
    if (error instanceof Response) {
      return Observable.throw(error);
    } else {
      return Observable.throw(error);
    }
  }

}
