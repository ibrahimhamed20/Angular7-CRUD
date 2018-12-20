import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // error handler function
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // All CRUD (create, read, update, delete) functions of products data.

  // GET: Display All Products Function
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  // GET: Display Specific Product
  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  // POST: Add New Product
  addProduct (product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  // PUT: Update Specific Product
  updateProduct (id, product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  // DELETE: Delete Specific Product
  deleteProduct (id): Observable<Product> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
  
}
