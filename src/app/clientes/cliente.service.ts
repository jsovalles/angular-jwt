import { Injectable } from '@angular/core';
//import {clientesJson} from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url: string = "http://localhost:8080/customers/v1";

  private urlPost: string = "http://localhost:8080/customers/v1/customer";

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' })

  getClientes(): Observable<Cliente[]> {
    //return of(clientesJson)
    return this.http.get(this.url).pipe(
      map(response => response as Cliente[])
    )
  };

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlPost, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        Swal.fire('Error al crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.patch<Cliente>(`${this.url}/customer/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }
        
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}/customer/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  constructor(private http: HttpClient, private router: Router) { }
}
