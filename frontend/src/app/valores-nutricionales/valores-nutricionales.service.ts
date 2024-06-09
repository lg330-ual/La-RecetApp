import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ValoresNutricionalesDto } from './valores-nutricionales-dto';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValoresNutricionalesService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getValoresNutricionales(): Observable<ValoresNutricionalesDto[]> {
    const url = `http://localhost:8080/nutritional-values/data`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('getValoresNutricionales'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // T-74 send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // T-75 better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
