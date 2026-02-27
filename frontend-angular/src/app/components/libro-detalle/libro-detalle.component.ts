import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css']
})
export class LibroDetalleComponent implements OnInit {
  libro: Libro | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libroService: LibroService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadLibro(id);
    }
  }

  loadLibro(id: string): void {
    this.loading = true;
    this.libroService.getLibroById(id).subscribe({
      next: (response) => {
        this.libro = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el libro. Por favor, intenta de nuevo.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/libros']);
  }

  editar(): void {
    if (this.libro) {
      this.router.navigate(['/editar', this.libro._id]);
    }
  }

  eliminar(): void {
    if (this.libro && confirm(`¿Estás seguro de que deseas eliminar "${this.libro.titulo}"?`)) {
      this.libroService.deleteLibro(this.libro._id).subscribe({
        next: () => {
          this.router.navigate(['/libros']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el libro.';
          console.error('Error:', err);
        }
      });
    }
  }
}

