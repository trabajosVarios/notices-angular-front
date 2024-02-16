import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { BodyNotices } from '../interfaces/notices.interfaces';

@Injectable({ providedIn: 'root' })

export class NoticiasService {

  private serviceApiUrl: string = 'https://api.spaceflightnewsapi.net/v4/articles/'
  private serviceBackUrl: string = 'http://localhost:9060'
  private getAllNotices: string = '/api/v1/getAllNotices'
  private postNotices: string = '/api/v1/saveNotices'

  constructor( private http:HttpClient ) { }

  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  SearchArticles():void {
    this.http.get(this.serviceApiUrl)
      .subscribe( resp => {
        console.log(resp);
      })
  }

  /* Get List from APIRest Web */
  GetListArticles(): Observable<BodyNotices> {
    return this.http
      .get<BodyNotices>(this.serviceApiUrl)
      .pipe(retry(1), catchError(this.errorHandler));
  }

  /* Get List from APIRest SpringBoot */
  GetListNoticesBack(): Observable<BodyNotices> {
    return this.http
      .get<BodyNotices>(this.serviceBackUrl + this.getAllNotices)
      .pipe(retry(1), catchError(this.errorHandler));
  }
  
  /* Post List to APIRest SpringBoot */
  PostNoticeBackEnd(data: any): Observable<BodyNotices> {
    return this.http
      .post<BodyNotices>(
        this.serviceBackUrl + this.postNotices,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandler));
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;      
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);

    return throwError(() => {
      return errorMessage;
    });
  }

  
}
