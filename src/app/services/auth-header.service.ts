import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';


@Injectable()
export class AuthHeaderService {

  public getHeaders() : Headers {
    let authHeaders = new Headers();
    let token = localStorage.getItem('id_token');
    authHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    authHeaders.append('Accept', 'application/json');
    if (token) {
      authHeaders.append('Authorization', 'Bearer ' + token)
    }
    return authHeaders;
  }
}