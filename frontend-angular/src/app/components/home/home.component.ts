import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalLibros: number = 0;
  librosDisponibles: number = 0;
  generosUnicos: Set<string> = new Set();
  ultimoLibro: any = null;
  loading: boolean = true;
  error: string = '';

  // helper para iterar en plantilla
  get generosArray(): string[] {
    return Array.from(this.generosUnicos);
  }

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.loading = true;
    // Cargar todos los libros para obtener estadísticas
    this.libroService.getAllLibros(1, 1000).subscribe({
      next: (response) => {
        const libros = response.data;
        this.totalLibros = response.pagination.totalItems;
        
        // Contar libros disponibles
        this.librosDisponibles = libros.filter(l => l.disponible).length;
        
        // Contar géneros únicos
        libros.forEach(libro => {
          libro.generos.forEach((genero: string) => {
            this.generosUnicos.add(genero);
          });
        });
        
        // Obtener el último libro agregado
        if (libros.length > 0) {
          this.ultimoLibro = libros[libros.length - 1];
        }
        
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar estadísticas';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }
}

