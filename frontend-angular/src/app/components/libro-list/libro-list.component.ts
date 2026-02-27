import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: ['./libro-list.component.css']
})
export class LibroListComponent implements OnInit {
  libros: Libro[] = [];
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';

  // Paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalLibros: number = 0;
  limit: number = 10;

  // Filtros
  searchTerm: string = '';
  selectedGenero: string = '';
  selectedDisponibilidad: string = '';
  generos: string[] = ['Ficción', 'No Ficción', 'Ciencia', 'Historia', 'Tecnología', 'Arte', 'Biografía', 'Educación'];

  constructor(
    private libroService: LibroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadLibros();
  }

  loadLibros(): void {
    this.loading = true;
    this.error = '';

    const filters: any = {};
    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.selectedGenero) filters.genero = this.selectedGenero;
    if (this.selectedDisponibilidad !== '') filters.disponible = this.selectedDisponibilidad === 'true';

    this.libroService.getAllLibros(this.currentPage, this.limit, filters).subscribe({
      next: (response) => {
        this.libros = response.data;
        this.totalPages = response.pagination.totalPages;
        this.totalLibros = response.pagination.totalItems;
        this.currentPage = response.pagination.currentPage;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los libros. Por favor, intenta de nuevo.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadLibros();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedGenero = '';
    this.selectedDisponibilidad = '';
    this.currentPage = 1;
    this.loadLibros();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLibros();
    }
  }

  verDetalle(id: string): void {
    this.router.navigate(['/libro', id]);
  }

  editarLibro(id: string): void {
    this.router.navigate(['/editar', id]);
  }

  eliminarLibro(id: string, titulo: string): void {
    if (confirm(`¿Estás seguro de que deseas eliminar el libro "${titulo}"?`)) {
      this.libroService.deleteLibro(id).subscribe({
        next: (response) => {
          this.successMessage = `Libro "${titulo}" eliminado correctamente.`;
          this.loadLibros();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.error = 'Error al eliminar el libro. Por favor, intenta de nuevo.';
          console.error('Error:', err);
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}

