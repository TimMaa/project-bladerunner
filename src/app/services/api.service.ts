import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  // Default API-Url
  baseUrl: string = 'api/';

  constructor(private http: Http) {
  }

  // If Response is a JSON, use this
  private extractJson(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  // If Response is plain Text, use this
  private extractText(res: Response) {
    let body = res.text();
    return body || {};
  }

  // Default Errorhandler for all Requests
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

  getAllPoints() {
    return this.http.get(this.baseUrl + 'points/')
      .map(this.extractJson)
      .catch(this.handleError);
  }

  submitPoint(x: number, y: number, color: string ) {
    let info = {
      x: x,
      y: y,
      color: color
    };

    return this.http.post(this.baseUrl + 'points/', info)
      .map(this.extractText)
      .catch(this.handleError);
  }

  submitSolution(solution: string) {
    return this.http.get(this.baseUrl + 'solution/' + solution)
      .map(this.extractText)
      .catch(this.handleError);
  }

  // get Response from API-Base
  getBase() {
    return this.http.get(this.baseUrl)
      .map(this.extractText)
      .catch(this.handleError);
  }
}
