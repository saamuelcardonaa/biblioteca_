# 🅰️ Biblioteca - Frontend Angular

✅ **ESTADO:** Implementado y funcional (Fase 2 del proyecto)

---

## 📋 Objetivo

Crear un cliente frontend con Angular que consuma la API REST de biblioteca y permita realizar operaciones CRUD completas sobre los libros.

---

## 🚀 Cómo Empezar

### 1. Instalar Angular CLI

```bash
npm install -g @angular/cli
```

### 2. Crear Proyecto Angular

```bash
# Ejecutar desde esta carpeta (frontend-angular)
ng new . --routing --style=css --skip-git

# Responder a las preguntas:
# - Enable autocompletion? Yes
# - Share usage data? No
```

### 3. Instalar Bootstrap

```bash
npm install bootstrap @popperjs/core
```

### 4. Configurar Bootstrap

**En `angular.json`, buscar la sección `"styles"` y agregar:**

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

---

## 📁 Estructura Requerida

```
frontend-angular/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── libro.model.ts          # Interfaces
│   │   ├── services/
│   │   │   └── libro.service.ts        # Servicio HTTP
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   ├── footer/
│   │   │   ├── home/
│   │   │   ├── libro-list/             # Listado con tabla
│   │   │   ├── libro-detalle/          # Vista individual
│   │   │   └── libro-form/             # Crear/Editar
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app-routing.module.ts
│   ├── environments/
│   │   └── environment.ts              # Variables de entorno
│   └── index.html
├── angular.json
└── package.json
```

---

## 🔧 Componentes a Crear

### 1. Generar Componentes

```bash
ng generate component components/navbar
ng generate component components/footer
ng generate component components/home
ng generate component components/libro-list
ng generate component components/libro-detalle
ng generate component components/libro-form
```

### 2. Generar Servicio

```bash
ng generate service services/libro
```

### 3. Generar Interfaces

```bash
ng generate interface models/libro
ng generate interface models/api-response
```

---

## 📝 Interfaces TypeScript

**`src/app/models/libro.model.ts`:**

```typescript
export interface Libro {
  _id: string;
  isbn: string;
  titulo: string;
  autor: string;
  editorial: string;
  anioPublicacion: number;
  generos: string[];
  numeroPaginas: number;
  descripcion: string;
  idioma: string;
  precio: number;
  stock: number;
  disponible: boolean;
  portada?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LibroCreate {
  isbn: string;
  titulo: string;
  autor: string;
  editorial: string;
  anioPublicacion: number;
  generos: string[];
  numeroPaginas: number;
  descripcion: string;
  idioma: string;
  precio: number;
  stock: number;
  portada?: string;
}
```

---

## 🌐 Servicio HTTP

**`src/app/services/libro.service.ts`:**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro, LibroCreate } from '../models/libro.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) { }

  getAllLibros(page = 1, limit = 20, filters?: any): Observable<any> {
    let params = `?page=${page}&limit=${limit}`;
    if (filters?.genero) params += `&genero=${filters.genero}`;
    if (filters?.disponible !== undefined) params += `&disponible=${filters.disponible}`;
    if (filters?.search) params += `&search=${filters.search}`;
    if (filters?.autor) params += `&autor=${filters.autor}`;
    
    return this.http.get<any>(`${this.apiUrl}/get/all${params}`);
  }

  getLibroById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`);
  }

  createLibro(libro: LibroCreate): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post`, libro);
  }

  updateLibro(id: string, libro: Partial<LibroCreate>): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/update/${id}`, libro);
  }

  deleteLibro(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
```

---

## 🔀 Rutas (Routing)

**`src/app/app-routing.module.ts`:**

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LibroListComponent } from './components/libro-list/libro-list.component';
import { LibroDetalleComponent } from './components/libro-detalle/libro-detalle.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'libros', component: LibroListComponent },
  { path: 'libros/:id', component: LibroDetalleComponent },
  { path: 'libros/nuevo', component: LibroFormComponent },
  { path: 'libros/editar/:id', component: LibroFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

## 🎨 Componentes Bootstrap

### Tabla de Libros
```html
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Título</th>
      <th>Autor</th>
      <th>Editorial</th>
      <th>Precio</th>
      <th>Stock</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let libro of libros">
      <td>{{ libro.titulo }}</td>
      <td>{{ libro.autor }}</td>
      <td>{{ libro.editorial }}</td>
      <td>{{ libro.precio | currency:'EUR' }}</td>
      <td>{{ libro.stock }}</td>
      <td>
        <button class="btn btn-info btn-sm" (click)="verDetalle(libro._id)">
          <i class="bi bi-eye"></i> Ver
        </button>
        <button class="btn btn-warning btn-sm" (click)="editar(libro._id)">
          <i class="bi bi-pencil"></i> Editar
        </button>
        <button class="btn btn-danger btn-sm" (click)="eliminar(libro._id)">
          <i class="bi bi-trash"></i> Eliminar
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

### Formulario Reactivo
```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class LibroFormComponent implements OnInit {
  libroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.libroForm = this.fb.group({
      isbn: ['', [Validators.required, Validators.pattern(/^\d{10}(\d{3})?$/)]],
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      autor: ['', [Validators.required, Validators.minLength(2)]],
      editorial: ['', Validators.required],
      anioPublicacion: ['', [Validators.required, Validators.min(1000), Validators.max(2026)]],
      generos: [[], Validators.required],
      numeroPaginas: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.maxLength(2000)]],
      idioma: ['español', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      portada: ['']
    });
  }
}
```

---

## ⚙️ Variables de Entorno

**`src/environments/environment.ts`:**

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'
};
```

**`src/environments/environment.prod.ts`:**

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-api-desplegada.com/api/v1'
};
```

---

## ✅ Checklist de Implementación

### Configuración Inicial
- [ ] Crear proyecto Angular
- [ ] Instalar Bootstrap
- [ ] Configurar angular.json
- [ ] Configurar HttpClientModule en app.module.ts

### Modelos y Servicios
- [ ] Crear interfaces Libro
- [ ] Crear LibroService con métodos HTTP
- [ ] Configurar environment

### Componentes
- [ ] Navbar component
- [ ] Footer component
- [ ] Home component
- [ ] LibroList component (listado con tabla)
- [ ] LibroDetalle component (vista individual)
- [ ] LibroForm component (formulario reactivo)

### Funcionalidades
- [ ] Listado de libros funcionando
- [ ] Paginación implementada
- [ ] Filtros por género
- [ ] Búsqueda por autor/título
- [ ] Ver detalle de libro
- [ ] Crear nuevo libro
- [ ] Editar libro existente
- [ ] Eliminar libro (con confirmación)

### UI/UX
- [ ] Bootstrap aplicado correctamente
- [ ] Spinner de carga
- [ ] Mensajes de éxito (alerts/toasts)
- [ ] Mensajes de error
- [ ] Validaciones visuales en formularios
- [ ] Responsive design

### Testing
- [ ] Probar todas las operaciones CRUD
- [ ] Verificar validaciones
- [ ] Probar navegación
- [ ] Verificar paginación
- [ ] Probar filtros

---

## 🎯 Requisitos del Proyecto

**De acuerdo al enunciado, debe incluir:**

✅ Consumo completo de la API  
✅ Servicios Angular para HTTP  
✅ Componentes separados  
✅ Formularios reactivos  
✅ Validaciones  
✅ Crear / editar / eliminar elementos  
✅ Vista detalle de los elementos  
✅ Paginación  
✅ Filtros  
✅ Bootstrap aplicado  
✅ Loader de carga  
✅ Mensajes de éxito/error  

---

## 🚀 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
ng serve

# Generar componente
ng generate component components/nombre-componente

# Generar servicio
ng generate service services/nombre-servicio

# Compilar para producción
ng build --configuration production

# Ejecutar tests
ng test
```

---

## 📚 Recursos

- **Documentación Angular:** https://angular.io/docs
- **Angular Forms:** https://angular.io/guide/reactive-forms
- **HttpClient:** https://angular.io/guide/http
- **Bootstrap Components:** https://getbootstrap.com/docs/5.3/components/
- **API del Backend:** http://localhost:3000/api/v1

---

## ⏱️ Tiempo Estimado

**Total:** 10-12 horas de trabajo

- Configuración inicial: 1h
- Servicios y modelos: 1h
- Componente de listado: 2h
- Formulario reactivo: 3h
- Detalle y navegación: 1h
- UI/UX y Bootstrap: 2h
- Testing y ajustes: 2h

---

## 💡 Consejos

1. **Sigue el orden:** Primero servicio, luego componentes
2. **Usa FormBuilder:** Para formularios reactivos
3. **Inyecta LibroService:** En todos los componentes que lo necesiten
4. **Maneja errores:** Usa operador `catchError` de RxJS
5. **Loading states:** Muestra spinners mientras cargan datos
6. **Valida todo:** Tanto en frontend como backend

---

## 📞 Ayuda

Si tienes dudas, consulta:

1. **Guía principal:** `../README.md`
2. **Plan de acción:** `../PLAN_DE_ACCION.md`
3. **API Testing:** `../backend/API_TESTING.md`
4. **Documentación oficial:** https://angular.io

---

**Estado:** ⚠️ Pendiente de implementación  
**Prioridad:** 🔴 Alta (50% de la nota de DWEC)  
**Siguiente paso:** Ejecutar `ng new . --routing --style=css --skip-git` - Fase 2

⚠️ **Pendiente de implementación**

## Para crear este frontend:

```bash
# Desde la raíz del proyecto
ng new frontend-angular --routing --style=css

# Instalar Bootstrap
cd frontend-angular
npm install bootstrap

# Configurar Bootstrap en angular.json
# Agregar en "styles":
# "node_modules/bootstrap/dist/css/bootstrap.min.css"

# Crear servicios y componentes
ng generate service services/pokemon
ng generate component components/home
ng generate component components/pokemon-list
ng generate component components/pokemon-detail
ng generate component components/pokemon-form

# Iniciar
ng serve
```

## Requisitos a implementar:

- ✅ Consumo de la misma API REST (`http://localhost:3000/api/v1`)
- ✅ HttpClientModule
- ✅ Servicios con HttpClient
- ✅ Formularios reactivos (FormBuilder)
- ✅ Validaciones
- ✅ CRUD completo
- ✅ Bootstrap UI
- ✅ Angular Router
- ✅ Manejo de estado

---

Consulta `README.md` en la raíz para más información.

