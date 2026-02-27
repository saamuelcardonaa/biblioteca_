# 🚀 Guía de Inicio Rápido - Frontend Angular

## ✅ Estado del Proyecto

El frontend Angular está **completamente implementado** y listo para usar.

## 📋 Pre-requisitos

1. ✅ Node.js instalado (v16 o superior)
2. ✅ npm instalado
3. ✅ Backend corriendo en `http://localhost:3000`
4. ✅ MongoDB con datos de prueba

## 🎯 Pasos para Iniciar

### 1. Navegar a la carpeta del proyecto

```bash
cd frontend-angular
```

### 2. Instalar dependencias (si no lo has hecho)

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm start
```

O alternativamente:

```bash
ng serve
```

### 4. Abrir en el navegador

Abre tu navegador y ve a:

```
http://localhost:4200
```

## 🎨 Funcionalidades Disponibles

### Página de Inicio (`/`)
- Bienvenida al sistema
- Descripción de funcionalidades
- Botones de acceso rápido

### Listado de Libros (`/libros`)
- ✅ Tabla con todos los libros
- ✅ Paginación (10 libros por página)
- ✅ Filtros:
  - Búsqueda por texto (título/autor)
  - Filtro por género
  - Filtro por disponibilidad
- ✅ Acciones: Ver, Editar, Eliminar

### Ver Detalle (`/libro/:id`)
- ✅ Información completa del libro
- ✅ Imagen de portada
- ✅ Todos los campos
- ✅ Botones para editar o eliminar

### Crear Libro (`/nuevo`)
- ✅ Formulario reactivo completo
- ✅ Validaciones en tiempo real
- ✅ Mensajes de error personalizados
- ✅ Selección múltiple de géneros

### Editar Libro (`/editar/:id`)
- ✅ Formulario precargado con datos actuales
- ✅ Mismas validaciones que crear
- ✅ Actualización en tiempo real

## 🧪 Probar la Aplicación

### 1. Ver el listado
1. Haz clic en "Ver Todos los Libros" en la página de inicio
2. Verás una tabla con todos los libros disponibles

### 2. Usar filtros
1. En la sección de filtros, escribe un término de búsqueda
2. Selecciona un género
3. Haz clic en "Buscar"

### 3. Ver detalle de un libro
1. En la tabla, haz clic en el botón azul "👁️ Ver"
2. Verás toda la información del libro

### 4. Crear un nuevo libro
1. Haz clic en "Agregar Nuevo Libro"
2. Rellena todos los campos obligatorios (*)
3. Selecciona al menos un género
4. Haz clic en "Crear Libro"

### 5. Editar un libro
1. En la tabla o en el detalle, haz clic en "✏️ Editar"
2. Modifica los campos que desees
3. Haz clic en "Actualizar Libro"

### 6. Eliminar un libro
1. Haz clic en el botón rojo "🗑️ Eliminar"
2. Confirma la eliminación en el diálogo

## 📊 Estructura de Navegación

```
┌─────────────────────────────────────────┐
│           NAVBAR (siempre visible)      │
│  [Inicio] [Libros] [Nuevo Libro]        │
└─────────────────────────────────────────┘
               ↓
    ┌──────────┴──────────┐
    ↓                      ↓
[Página Inicio]      [Listado Libros]
    │                      │
    │                      ├─→ [Ver Detalle]
    │                      │      │
    │                      │      └─→ [Editar]
    │                      │
    └──────────────────────┴─→ [Nuevo Libro]
```

## 🎯 Validaciones del Formulario

Cuando crees o edites un libro, verás validaciones en tiempo real:

- ✅ **Verde**: Campo válido
- ❌ **Rojo**: Campo inválido
- 📝 **Mensaje**: Descripción del error

### Ejemplos de validaciones:
- ISBN: Debe tener 10 o 13 dígitos (ej: 9788420412146)
- Título: Mínimo 2 caracteres
- Año: Entre 1000 y el año actual
- Géneros: Debes seleccionar al menos uno
- Precio: Debe ser mayor o igual a 0

## 🔧 Configuración

Si necesitas cambiar la URL de la API, edita:

**`src/environments/environment.ts`:**

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1'  // Cambia esto si es necesario
};
```

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm start
```

### Puerto 4200 ocupado
```bash
# Inicia en otro puerto
ng serve --port 4300
```

### Error de CORS
Verifica que el backend tenga CORS habilitado:
```javascript
app.use(cors({
  origin: 'http://localhost:4200'
}));
```

### No se cargan los libros
1. Verifica que el backend esté corriendo en `http://localhost:3000`
2. Abre la consola del navegador (F12) para ver errores
3. Verifica que MongoDB tenga datos

## 📱 Responsive Design

La aplicación es completamente responsive:
- 📱 **Mobile**: Vista optimizada para móviles
- 📱 **Tablet**: Diseño adaptado para tablets
- 💻 **Desktop**: Vista completa con todas las funcionalidades

## ⌨️ Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test

# Verificar versión de Angular
ng version

# Generar nuevo componente (si necesitas)
ng generate component components/nombre-componente

# Limpiar caché
ng cache clean
```

## ✅ Checklist Antes de Presentar

- [ ] Backend corriendo en puerto 3000
- [ ] Frontend Angular corriendo en puerto 4200
- [ ] MongoDB con al menos 20 libros
- [ ] Todas las operaciones CRUD funcionan
- [ ] Filtros funcionan correctamente
- [ ] Paginación funciona
- [ ] Validaciones muestran mensajes
- [ ] Mensajes de éxito/error aparecen
- [ ] La aplicación es responsive
- [ ] No hay errores en consola

## 🎓 Tecnologías Utilizadas

- **Angular 17**: Framework frontend
- **TypeScript 5.2**: Lenguaje de programación
- **Bootstrap 5**: Framework CSS
- **Bootstrap Icons**: Iconografía
- **RxJS**: Programación reactiva
- **HttpClient**: Cliente HTTP
- **Reactive Forms**: Formularios reactivos

## 📚 Documentación Adicional

- `README.md` - Guía completa de instalación
- `ANGULAR_README.md` - Documentación técnica detallada
- `../backend/API_TESTING.md` - Documentación de la API

## 🎉 ¡Listo!

Tu frontend Angular está completamente funcional. Ahora puedes:

1. Probar todas las funcionalidades
2. Crear capturas de pantalla para el informe
3. Documentar las pruebas realizadas
4. Preparar la presentación

---

**¡El frontend Angular está 100% completo y listo para usar!** 🚀

