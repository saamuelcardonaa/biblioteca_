import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private readonly baseUrl = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de libros desde el backend.
   * Hace una petición GET a `${apiUrl}/libros` y devuelve un
   * Observable con el arreglo de libros.
   */
  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.baseUrl);
  }
}
