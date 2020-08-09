import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResultViewModel } from '../ViewModels/result-view-models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userToken: string;

  constructor(private route: Router, private tokenService: TokenService, private http: HttpClient) {
    this.userToken = this.tokenService.getToken();
  }

  // Request options
  private setHeaders(): HttpHeaders {
   
    let headersConfig =
    {
      'Content-Type': 'application/json',
      'Accept': '*/*',//'application/json' ,      
       'Authorization': this.tokenService.getToken()
    };
    return new HttpHeaders(headersConfig);
  }

  private setHeadersWithImage(): HttpHeaders {
    let headersConfig =
    {
      'Accept': 'application/json',      
      'token': this.tokenService.getToken()
    };
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    console.error(error);
    if (error.status != "200") {
         // alert(JSON.stringify(error));
      //var base_url = window.location.origin;      
     window.open(`${environment.base_url}/error/${error.error.message }`, "_self");

    }
    return Observable.throw(error);
  }

  get(path: string, params?: HttpParams): Observable<ResultViewModel> {
    //console.log(environment.api_url+"/"+path);
    //console.log("inside service api ");
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params }).pipe(catchError(er => this.formatErrors(er)), map((res: ResultViewModel) => res));
  }


  getImages(path: string): Observable<Blob> {
    //console.log(environment.api_url+"/"+path);
    //console.log("inside service api ");
    return this.http.get(`${environment.api_url}${path}`, { responseType: 'blob' });
  }

  post(path: string, body: Object = {}): Observable<ResultViewModel> {    
    return this.http.post(`${environment.api_url}${path}`, body, { headers: this.setHeaders() }).pipe(catchError(this.formatErrors), map((res: ResultViewModel) => res));
  }

  update(path: string, body: Object = {}): Observable<ResultViewModel> {
    return this.http.put(`${environment.api_url}${path}`, body, { headers: this.setHeaders() }).pipe(catchError(this.formatErrors), map((res: ResultViewModel) => res));
  }

  remove(path: string): Observable<ResultViewModel> {
    return this.http.delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .pipe(catchError(this.formatErrors), map((res: ResultViewModel) => res));
  }

  upload(path: string, body: Object): Observable<ResultViewModel> {
    return this.http.post(`${environment.api_url}${path}`, body, { headers: this.setHeadersWithImage() })
      .pipe(map((res: ResultViewModel) => res));
  }

  // download(path: string, image: string): Observable<ResultViewModel> {
  //   return this.http.post(`${environment.api_url}${path}${image}`, { headers: this.setHeadersWithImage() })
  //     .pipe(map((res: ResultViewModel) => res));
  // }

  removeAttachment(path: string): Observable<ResultViewModel> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders() }).pipe(map((res: ResultViewModel) => res));
  }
}
