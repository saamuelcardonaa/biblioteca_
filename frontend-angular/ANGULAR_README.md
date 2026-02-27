# 🅰️ Frontend Angular - Biblioteca

## 📋 Descripción

Cliente frontend desarrollado con **Angular 17** que consume la API REST del sistema de gestión de biblioteca. Incluye todas las operaciones CRUD, validaciones, paginación, filtros y una interfaz responsive con Bootstrap.

## ✅ Características Implementadas

### Funcionalidades Principales
- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar libros
- ✅ **Listado con paginación**: Navegación por páginas de resultados
- ✅ **Filtros avanzados**: Por género, disponibilidad y búsqueda de texto
- ✅ **Vista detallada**: Información completa de cada libro
- ✅ **Formularios reactivos**: Con validaciones en tiempo real

### Aspectos Técnicos
- ✅ **HttpClientModule**: Comunicación con la API REST
- ✅ **Servicios Angular**: Inyección de dependencias
- ✅ **Routing**: Navegación entre componentes
- ✅ **Reactive Forms**: FormBuilder, FormGroup, FormArray, Validators
- ✅ **Bootstrap 5**: UI moderna y responsive
- ✅ **Bootstrap Icons**: Iconografía
- ✅ **TypeScript**: Tipado fuerte con interfaces
- ✅ **Manejo de errores**: Mensajes de éxito/error
- ✅ **Loading states**: Spinners durante las peticiones

## 🚀 Instalación y Ejecución

### 1. Instalar Dependencias

```bash
cd frontend-angular
npm install
```

### 2. Configurar la API

Edita `src/environments/environment.ts` si la API está en otra URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'
};
```

### 3. Iniciar el Servidor de Desarrollo

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en: **http://localhost:4200**

### 4. Compilar para Producción

```bash
npm run build
# o
ng build --configuration production
```

Los archivos compilados estarán en `dist/biblioteca-angular/`

## 📁 Estructura del Proyecto

```
frontend-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/              # Barra de navegación
│   │   │   ├── footer/              # Pie de página
│   │   │   ├── home/                # Página de inicio
│   │   │   ├── libro-list/          # Listado con tabla y filtros
│   │   │   ├── libro-detalle/       # Vista detallada de un libro
│   │   │   └── libro-form/          # Formulario crear/editar
│   │   ├── models/
│   │   │   └── libro.model.ts       # Interfaces TypeScript
│   │   ├── services/
│   │   │   └── libro.service.ts     # Servicio HTTP
│   │   ├── app-routing.module.ts    # Configuración de rutas
│   │   ├── app.module.ts            # Módulo principal
│   │   └── app.component.*          # Componente raíz
│   ├── environments/
│   │   ├── environment.ts           # Variables de desarrollo
│   │   └── environment.prod.ts      # Variables de producción
│   ├── assets/                      # Recursos estáticos
│   ├── index.html                   # HTML principal
│   └── styles.css                   # Estilos globales
├── angular.json                     # Configuración de Angular
├── package.json                     # Dependencias
└── tsconfig.json                    # Configuración TypeScript
```

## 🔀 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | HomeComponent | Página de inicio con información del proyecto |
| `/libros` | LibroListComponent | Listado completo con tabla, filtros y paginación |
| `/libro/:id` | LibroDetalleComponent | Vista detallada de un libro específico |
| `/nuevo` | LibroFormComponent | Formulario para crear un nuevo libro |
| `/editar/:id` | LibroFormComponent | Formulario para editar un libro existente |

## 🧩 Componentes

### 1. NavbarComponent
Barra de navegación superior con enlaces a las diferentes secciones.

### 2. FooterComponent
Pie de página con información del proyecto.

### 3. HomeComponent
Página de bienvenida con descripción del proyecto y accesos directos.

### 4. LibroListComponent
- Listado de libros en tabla responsive
- Paginación configurable
- Filtros por: género, disponibilidad, búsqueda de texto
- Botones de acciones: ver, editar, eliminar

### 5. LibroDetalleComponent
- Vista completa de la información del libro
- Imagen de portada
- Todos los campos del modelo
- Opciones para editar o eliminar

### 6. LibroFormComponent
- Formulario reactivo con validaciones
- Campos: ISBN, título, autor, editorial, año, géneros, páginas, descripción, idioma, precio, stock, portada
- Validaciones en tiempo real
- Mensajes de error personalizados
- Modo crear/editar según la ruta

## 🔧 Servicio HTTP (LibroService)

Métodos disponibles:

```typescript
getAllLibros(page, limit, filters): Observable<PaginatedResponse<Libro>>
getLibroById(id): Observable<ApiResponse<Libro>>
createLibro(libro): Observable<ApiResponse<Libro>>
updateLibro(id, libro): Observable<ApiResponse<Libro>>
deleteLibro(id): Observable<ApiResponse<any>>
```

## ✔️ Validaciones del Formulario

| Campo | Validaciones |
|-------|--------------|
| ISBN | Requerido, 10 o 13 dígitos |
| Título | Requerido, 2-200 caracteres |
| Autor | Requerido, 2-100 caracteres |
| Editorial | Requerido, mínimo 2 caracteres |
| Año | Requerido, 1000 - año actual |
| Géneros | Requerido, al menos uno |
| Páginas | Requerido, mínimo 1 |
| Descripción | Requerido, 10-2000 caracteres |
| Idioma | Requerido |
| Precio | Requerido, mínimo 0 |
| Stock | Requerido, mínimo 0 |
| Portada | Opcional, URL válida |

## 🎨 UI/UX

- **Framework**: Bootstrap 5
- **Iconos**: Bootstrap Icons
- **Diseño**: Responsive (mobile-first)
- **Colores**: Paleta predefinida de Bootstrap
- **Animaciones**: Transiciones suaves en hover
- **Feedback**: Alertas de éxito/error, spinners de carga

## 📦 Dependencias Principales

```json
{
  "@angular/core": "^17.0.0",
  "@angular/common": "^17.0.0",
  "@angular/forms": "^17.0.0",
  "@angular/router": "^17.0.0",
  "@angular/platform-browser": "^17.0.0",
  "bootstrap": "^5.3.2",
  "rxjs": "^7.8.0",
  "typescript": "~5.2.2"
}
```

## ✅ Checklist de Requisitos del Proyecto

### Consumo de API
- ✅ Consume la misma API REST que React
- ✅ Endpoint base: `http://localhost:3000/api/v1`
- ✅ Todas las operaciones CRUD implementadas

### Servicios Angular
- ✅ LibroService con HttpClient
- ✅ Inyección de dependencias
- ✅ Manejo de observables (RxJS)

### Componentes
- ✅ 6 componentes separados
- ✅ Navbar y Footer reutilizables
- ✅ Componentes funcionales con TypeScript

### Formularios Reactivos
- ✅ FormBuilder para construcción
- ✅ FormGroup para agrupación
- ✅ FormArray para géneros
- ✅ Validators para validaciones

### Validaciones
- ✅ Validaciones síncronas
- ✅ Mensajes de error personalizados
- ✅ Feedback visual (clases is-valid/is-invalid)
- ✅ Prevención de envío con formulario inválido

### CRUD Completo
- ✅ Crear nuevo libro
- ✅ Listar todos los libros
- ✅ Ver detalle de un libro
- ✅ Actualizar libro existente
- ✅ Eliminar libro (con confirmación)

### Paginación
- ✅ Paginación del lado del servidor
- ✅ Navegación entre páginas
- ✅ Indicador de página actual
- ✅ Total de registros visible

### Filtros
- ✅ Búsqueda por texto (título/autor)
- ✅ Filtro por género
- ✅ Filtro por disponibilidad
- ✅ Botón para limpiar filtros

### Bootstrap
- ✅ Bootstrap 5 integrado en angular.json
- ✅ Tablas responsive
- ✅ Formularios con clases Bootstrap
- ✅ Botones estilizados
- ✅ Cards y alerts
- ✅ Grid system
- ✅ Bootstrap Icons

### Loader de Carga
- ✅ Spinner durante peticiones HTTP
- ✅ Estado de carga en formularios
- ✅ Deshabilitación de botones durante carga

### Mensajes
- ✅ Alertas de éxito (verde)
- ✅ Alertas de error (rojo)
- ✅ Auto-dismiss después de 3 segundos
- ✅ Mensajes contextuales

### Routing
- ✅ Angular Router configurado
- ✅ 5 rutas funcionales
- ✅ Navegación programática
- ✅ Parámetros de ruta (:id)
- ✅ Redirección para rutas no encontradas

## 🧪 Testing

Para ejecutar los tests:

```bash
npm test
# o
ng test
```

## 📝 Notas Importantes

1. **Backend debe estar corriendo**: Asegúrate de que el servidor Node.js esté en ejecución en `http://localhost:3000`
2. **CORS**: El backend debe tener CORS habilitado para `http://localhost:4200`
3. **Datos de prueba**: Usa el script de seed del backend para poblar la base de datos

## 🐛 Solución de Problemas

### Error de CORS
Si ves errores de CORS, verifica que el backend tenga configurado:
```javascript
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:3001']
}));
```

### Puerto ocupado
Si el puerto 4200 está ocupado, puedes cambiar el puerto:
```bash
ng serve --port 4300
```

### Errores de compilación
Si hay errores al compilar, intenta:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Recursos

- [Documentación Angular](https://angular.io/docs)
- [Angular Forms](https://angular.io/guide/reactive-forms)
- [Bootstrap 5](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [RxJS](https://rxjs.dev/)

## 👨‍💻 Desarrollo

- **Framework**: Angular 17
- **Lenguaje**: TypeScript 5.2
- **Build Tool**: Angular CLI
- **UI Framework**: Bootstrap 5
- **HTTP Client**: HttpClient de Angular

---

**Proyecto desarrollado como parte del Proyecto Final Integrador MEAN Stack**

Frontend Angular ✅ | Frontend React ✅ | Backend API ✅ | MongoDB ✅

