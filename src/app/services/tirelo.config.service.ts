import {Injectable} from '@angular/core';

@Injectable()
export class ConfigurationService {
  rootUrl: string = 'http://localhost:58006/';
  //rootUrl: string = 'http://tireloapi.azurewebsites.net/';

  public RootUrl(): string {
    return this.rootUrl;
  }
}
