import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  baseUrl: string = 'http://localhost:3000/api/';

  constructor(private http: Http) {
  }

  private extractJson(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private extractText(res: Response) {
    let body = res.text();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getBase() {
    return this.http.get(this.baseUrl)
      .map(this.extractText)
      .catch(this.handleError);
  }
}
