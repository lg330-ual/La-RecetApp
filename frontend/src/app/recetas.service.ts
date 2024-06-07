import { Injectable } from '@angular/core';
import { Receta } from './receta';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecetasService {

  private recetaAEditar?: Receta;

  urlBaseDatos: string = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getRecetaRandom(): Observable<Receta> {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    return this.http.get<any>(url).pipe(
      map((data) => {
        let response = data.meals[0];
        let receta: Receta = {
          id: response.idMeal,
          nombre: response.strMeal,
          imagen: response.strMealThumb,
          categoria: response.strCategory,
          area: response.strArea,
          preparacion: response.strInstructions,
          guardada: false,
          ingredientes: {},
        };
        for (let i = 1; i <= 20; i++) {
          let ingrediente: string = response['strIngredient' + i];
          let cantidad: string = response['strMeasure' + i];
          if (ingrediente != '' && cantidad != '') {
            receta.ingredientes[ingrediente] = cantidad;
          } else break;
        }

        return receta;
      }),
      catchError(this.handleError<Receta>('getRecetaRandom'))
    );
  }

  guardarReceta(receta: Receta): Observable<any> {
    const url = `${this.urlBaseDatos}/users/1`;
    const body: Receta = receta;
    body.guardada = true;
    return this.http
      .post(url, body, this.httpOptions)
      .pipe(catchError(this.handleError<any>('guardarReceta')));
  }

  getRecetasGuardadas(): Observable<Receta[]> {
    const url = `${this.urlBaseDatos}/users/1`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      map((data) => data.recetasGuardadas),
      catchError(this.handleError<any>('getRecetasGuardadas'))
    );
  }

  quitarRecetaGuardada(receta: Receta): Observable<any> {
    const url = `${this.urlBaseDatos}/users/1/recetas-guardadas`;
    const body: Receta = receta;

    return this.http
      .put(url, body, this.httpOptions)
      .pipe(catchError(this.handleError<any>('quitarRecetaGuardada')));
  }

  crearReceta(receta: Receta): Observable<Receta> {
    const url = `${this.urlBaseDatos}/users/1/recetas-creadas`;
    const body: Receta = receta;
    return this.http
      .post<Receta>(url, body, this.httpOptions)
      .pipe(catchError(this.handleError<Receta>('crearReceta')));
  }

  eliminarReceta(receta: Receta): Observable<any> {
    const url = `${this.urlBaseDatos}/users/1/recetas-creadas/${receta.id}`;
    return this.http
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError<any>('quitarRecetaGuardada')));
  }

  getRecetasCreadas(): Observable<Receta[]> {
    const url = `${this.urlBaseDatos}/users/1`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      map((data) => data.recetasCreadas),
      catchError(this.handleError<any>('getRecetasCreadas'))
    );
  }

  /* GET heroes whose name contains search term */
  buscarRecetas(term: string): Observable<Receta[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
    return this.http.get<any>(url).pipe(
      tap((x) =>
        x.length
          ? console.log(`found recipes matching "${term}"`)
          : console.log(`no recipes matching "${term}"`)
      ),
      map((data) => {
        let size = data.meals.length;
        let recetas: Receta[] = [];

        for (let i = 0; i < size; i++) {
          let response = data.meals[i];
          let receta: Receta = {
            id: response.idMeal,
            nombre: response.strMeal,
            imagen: response.strMealThumb,
            categoria: response.strCategory,
            area: response.strArea,
            preparacion: response.strInstructions,
            guardada: false,
            ingredientes: {},
          };
          for (let i = 1; i <= 20; i++) {
            let ingrediente: string = response['strIngredient' + i];
            let cantidad: string = response['strMeasure' + i];
            if (ingrediente != '' && cantidad != '') {
              receta.ingredientes[ingrediente] = cantidad;
            } else break;
          }

          recetas.push(receta);
        }

        return recetas;
      }),
      catchError(this.handleError<Receta[]>('buscarRecetas', []))
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


  setRecetaAEditar(receta: Receta) {
    this.recetaAEditar = receta;
  }

  getRecetaAEditar(): Receta | undefined {
    return this.recetaAEditar;
  }
}
