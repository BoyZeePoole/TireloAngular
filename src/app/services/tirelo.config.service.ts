import {Injectable} from '@angular/core';

@Injectable()
export class ConfigurationService {
  rootUrl: string = 'http://localhost:58006/';


  public RootUrl(): string {
    return this.rootUrl;
  }

}
