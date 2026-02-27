import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.css']
})
export class LibroFormComponent implements OnInit {
  libroForm: FormGroup;
  isEditMode: boolean = false;
  libroId: string | null = null;
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';

  generosDisponibles: string[] = [
    'Ficción', 'No Ficción', 'Ciencia', 'Historia',
    'Tecnología', 'Arte', 'Biografía', 'Educación'
  ];

  idiomasDisponibles: string[] = [
    'español', 'inglés', 'francés', 'alemán', 'italiano', 'portugués'
  ];

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.libroForm = this.fb.group({
      isbn: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}(\d{3})?$/)
      ]],
      titulo: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
      autor: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      editorial: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      anioPublicacion: ['', [
        Validators.required,
        Validators.min(1000),
        Validators.max(new Date().getFullYear())
      ]],
      generos: this.fb.array([], Validators.required),
      numeroPaginas: ['', [
        Validators.required,
        Validators.min(1)
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(2000)
      ]],
      idioma: ['español', Validators.required],
      precio: ['', [
        Validators.required,
        Validators.min(0)
      ]],
      stock: ['', [
        Validators.required,
        Validators.min(0)
      ]],
      portada: ['', Validators.pattern(/^https?:\/\/.+/)]
    });
  }

  ngOnInit(): void {
    this.libroId = this.route.snapshot.paramMap.get('id');
    if (this.libroId) {
      this.isEditMode = true;
      this.loadLibro(this.libroId);
    }
  }

  get generosFormArray(): FormArray {
    return this.libroForm.get('generos') as FormArray;
  }

  onGeneroChange(event: any, genero: string): void {
    if (event.target.checked) {
      this.generosFormArray.push(this.fb.control(genero));
    } else {
      const index = this.generosFormArray.controls.findIndex(x => x.value === genero);
      this.generosFormArray.removeAt(index);
    }
  }

  isGeneroSelected(genero: string): boolean {
    return this.generosFormArray.value.includes(genero);
  }

  loadLibro(id: string): void {
    this.loading = true;
    this.libroService.getLibroById(id).subscribe({
      next: (response) => {
        const libro = response.data;
        this.libroForm.patchValue({
          isbn: libro.isbn,
          titulo: libro.titulo,
          autor: libro.autor,
          editorial: libro.editorial,
          anioPublicacion: libro.anioPublicacion,
          numeroPaginas: libro.numeroPaginas,
          descripcion: libro.descripcion,
          idioma: libro.idioma,
          precio: libro.precio,
          stock: libro.stock,
          portada: libro.portada || ''
        });

        // Cargar géneros
        this.generosFormArray.clear();
        libro.generos.forEach(genero => {
          this.generosFormArray.push(this.fb.control(genero));
        });

        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el libro.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.libroForm.invalid) {
      Object.keys(this.libroForm.controls).forEach(key => {
        this.libroForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    const formData = this.libroForm.value;

    if (this.isEditMode && this.libroId) {
      this.libroService.updateLibro(this.libroId, formData).subscribe({
        next: (response) => {
          this.successMessage = 'Libro actualizado correctamente.';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/libro', this.libroId]);
          }, 1500);
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al actualizar el libro.';
          this.loading = false;
          console.error('Error:', err);
        }
      });
    } else {
      this.libroService.createLibro(formData).subscribe({
        next: (response) => {
          this.successMessage = 'Libro creado correctamente.';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/libros']);
          }, 1500);
        },
        error: (err) => {
          this.error = err.error?.message || 'Error al crear el libro.';
          this.loading = false;
          console.error('Error:', err);
        }
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.libroForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    }
    if (control?.hasError('maxlength')) {
      return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;
    }
    if (control?.hasError('min')) {
      return `El valor mínimo es ${control.errors?.['min'].min}.`;
    }
    if (control?.hasError('max')) {
      return `El valor máximo es ${control.errors?.['max'].max}.`;
    }
    if (control?.hasError('pattern')) {
      if (field === 'isbn') {
        return 'ISBN debe tener 10 o 13 dígitos.';
      }
      if (field === 'portada') {
        return 'Debe ser una URL válida (http:// o https://).';
      }
    }
    return '';
  }

  cancelar(): void {
    this.router.navigate(['/libros']);
  }
}

