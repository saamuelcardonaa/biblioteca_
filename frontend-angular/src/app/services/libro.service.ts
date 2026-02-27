import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro, LibroCreate, ApiResponse, PaginatedResponse } from '../models/libro.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) { }

  getAllLibros(page: number = 1, limit: number = 20, filters?: any): Observable<PaginatedResponse<Libro>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters?.genero) {
      params = params.set('genero', filters.genero);
    }
    if (filters?.disponible !== undefined) {
      params = params.set('disponible', filters.disponible.toString());
    }
    if (filters?.search) {
      params = params.set('search', filters.search);
    }
    if (filters?.autor) {
      params = params.set('autor', filters.autor);
    }

    return this.http.get<PaginatedResponse<Libro>>(`${this.apiUrl}/get/all`, { params });
  }

  getLibroById(id: string): Observable<ApiResponse<Libro>> {
    return this.http.get<ApiResponse<Libro>>(`${this.apiUrl}/get/${id}`);
  }

  createLibro(libro: LibroCreate): Observable<ApiResponse<Libro>> {
    return this.http.post<ApiResponse<Libro>>(`${this.apiUrl}/post`, libro);
  }

  updateLibro(id: string, libro: Partial<LibroCreate>): Observable<ApiResponse<Libro>> {
    return this.http.patch<ApiResponse<Libro>>(`${this.apiUrl}/update/${id}`, libro);
  }

  deleteLibro(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/delete/${id}`);
  }
}

