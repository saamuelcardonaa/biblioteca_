# 🧪 Testing de la API - Colección Postman/Thunder Client

Ejemplos de peticiones HTTP para probar todos los endpoints de la API de Biblioteca.

---

## 📋 Configuración Base

**Base URL:** `http://localhost:3000/api/v1`

**Headers por defecto:**
```
Content-Type: application/json
```

---

## 🔍 1. Documentación de la API

### GET - Ver endpoints disponibles

```http
GET http://localhost:3000/api/v1
```

**Respuesta esperada (200 OK):**
```json
{
  "success": true,
  "message": "Biblioteca API - MEAN Stack Project",
  "version": "1.0.0",
  "endpoints": {
    "documentation": "GET /api/v1",
    "getAllLibros": "GET /api/v1/libros/get/all?page=1&limit=20&genero=ficción&disponible=true",
    "getLibroById": "GET /api/v1/libros/get/:id",
    "createLibro": "POST /api/v1/libros/post",
    "updateLibro": "PATCH /api/v1/libros/update/:id",
    "deleteLibro": "DELETE /api/v1/libros/delete/:id"
  }
}
```

---

## 📚 2. Obtener Todos los Libros

### GET - Sin filtros (paginación por defecto)

```http
GET http://localhost:3000/api/v1/libros/get/all
```

**Respuesta esperada (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "67b4c8e9f12a3b45d678e901",
      "isbn": "9788408043640",
      "titulo": "Cien años de soledad",
      "autor": "Gabriel García Márquez",
      "editorial": "Editorial Sudamericana",
      "anioPublicacion": 1967,
      "generos": ["ficción", "novela"],
      "numeroPaginas": 471,
      "descripcion": "La obra maestra del realismo mágico...",
      "idioma": "español",
      "precio": 25.99,
      "stock": 15,
      "disponible": true,
      "portada": "https://images.com/cien-anos.jpg",
      "createdAt": "2026-02-12T10:30:00.000Z",
      "updatedAt": "2026-02-12T10:30:00.000Z"
    }
    // ... más libros
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 25,
    "itemsPerPage": 20,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### GET - Con paginación

```http
GET http://localhost:3000/api/v1/libros/get/all?page=1&limit=10
```

### GET - Filtrar por género

```http
GET http://localhost:3000/api/v1/libros/get/all?genero=fantasía
```

Géneros válidos: `ficción`, `no ficción`, `novela`, `ciencia ficción`, `fantasía`, `thriller`, `misterio`, `romance`, `histórico`, `biografía`, `autoayuda`, `tecnología`, `ciencia`, `poesía`, `drama`, `terror`, `aventura`, `policial`, `filosofía`, `ensayo`

### GET - Filtrar por disponibilidad

```http
GET http://localhost:3000/api/v1/libros/get/all?disponible=true
```

### GET - Buscar por título

```http
GET http://localhost:3000/api/v1/libros/get/all?search=Quijote
```

### GET - Buscar por autor

```http
GET http://localhost:3000/api/v1/libros/get/all?autor=García Márquez
```

### GET - Múltiples filtros

```http
GET http://localhost:3000/api/v1/libros/get/all?page=1&limit=5&genero=ficción&disponible=true&autor=Tolkien
```

---

## 📖 3. Obtener Libro por ID

### GET - Libro específico

```http
GET http://localhost:3000/api/v1/libros/get/67b4c8e9f12a3b45d678e901
```

**Nota:** Reemplaza el ID con uno real de tu base de datos.

**Respuesta esperada (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67b4c8e9f12a3b45d678e901",
    "isbn": "9788408043640",
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    // ... resto de campos
  }
}
```

**Error si no existe (404 Not Found):**
```json
{
  "success": false,
  "message": "Libro no encontrado"
}
```

**Error ID inválido (400 Bad Request):**
```json
{
  "success": false,
  "message": "ID de libro inválido"
}
```

---

## ➕ 4. Crear Nuevo Libro

### POST - Crear libro

```http
POST http://localhost:3000/api/v1/libros/post
Content-Type: application/json

{
  "isbn": "9781234567890",
  "titulo": "Mi Libro de Prueba",
  "autor": "Autor de Ejemplo",
  "editorial": "Editorial Test",
  "anioPublicacion": 2024,
  "generos": ["ficción", "aventura"],
  "numeroPaginas": 350,
  "descripcion": "Una historia emocionante sobre aventuras y descubrimientos en tierras lejanas.",
  "idioma": "español",
  "precio": 22.50,
  "stock": 8,
  "portada": "https://ejemplo.com/portada.jpg"
}
```

**Respuesta esperada (201 Created):**
```json
{
  "success": true,
  "message": "Libro creado exitosamente",
  "data": {
    "_id": "67b4c8e9f12a3b45d678e999",
    "isbn": "9781234567890",
    "titulo": "Mi Libro de Prueba",
    // ... resto de campos
    "createdAt": "2026-02-12T11:00:00.000Z",
    "updatedAt": "2026-02-12T11:00:00.000Z"
  }
}
```

**Error ISBN duplicado (409 Conflict):**
```json
{
  "success": false,
  "message": "Ya existe un libro con ese ISBN"
}
```

**Error de validación (400 Bad Request):**
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El ISBN debe tener 10 o 13 dígitos",
    "El año debe ser mayor o igual a 1000"
  ]
}
```

### POST - Libro con campos mínimos

```http
POST http://localhost:3000/api/v1/libros/post
Content-Type: application/json

{
  "isbn": "9780987654321",
  "titulo": "Libro Mínimo",
  "autor": "Autor Mínimo",
  "editorial": "Editorial Mínima",
  "anioPublicacion": 2023,
  "generos": ["novela"],
  "numeroPaginas": 200,
  "descripcion": "Descripción básica del libro.",
  "idioma": "español",
  "precio": 15.00,
  "stock": 5
}
```

---

## ✏️ 5. Actualizar Libro

### PATCH - Actualizar campos específicos

```http
PATCH http://localhost:3000/api/v1/libros/update/67b4c8e9f12a3b45d678e901
Content-Type: application/json

{
  "stock": 20,
  "precio": 19.99,
  "disponible": true
}
```

**Respuesta esperada (200 OK):**
```json
{
  "success": true,
  "message": "Libro actualizado exitosamente",
  "data": {
    "_id": "67b4c8e9f12a3b45d678e901",
    // ... campos actualizados
    "updatedAt": "2026-02-12T11:30:00.000Z"
  }
}
```

### PATCH - Actualizar múltiples campos

```http
PATCH http://localhost:3000/api/v1/libros/update/67b4c8e9f12a3b45d678e901
Content-Type: application/json

{
  "titulo": "Cien Años de Soledad - Edición Especial",
  "precio": 29.99,
  "stock": 30,
  "generos": ["ficción", "novela", "histórico"],
  "portada": "https://nueva-imagen.com/portada.jpg"
}
```

**Error libro no encontrado (404 Not Found):**
```json
{
  "success": false,
  "message": "Libro no encontrado"
}
```

**Error ISBN duplicado al actualizar (409 Conflict):**
```json
{
  "success": false,
  "message": "Ya existe un libro con ese ISBN"
}
```

---

## 🗑️ 6. Eliminar Libro

### DELETE - Eliminar libro

```http
DELETE http://localhost:3000/api/v1/libros/delete/67b4c8e9f12a3b45d678e901
```

**Respuesta esperada (200 OK):**
```json
{
  "success": true,
  "message": "Libro eliminado exitosamente",
  "data": {
    "_id": "67b4c8e9f12a3b45d678e901",
    "titulo": "Cien años de soledad",
    // ... datos del libro eliminado
  }
}
```

**Error libro no encontrado (404 Not Found):**
```json
{
  "success": false,
  "message": "Libro no encontrado"
}
```

---

## 🧪 Casos de Prueba Recomendados

### ✅ Tests Básicos CRUD

1. **Crear un libro** → Verificar que se crea correctamente
2. **Obtener todos los libros** → Verificar que aparece el nuevo libro
3. **Obtener libro por ID** → Verificar que devuelve el correcto
4. **Actualizar el libro** → Verificar que los cambios se guardan
5. **Eliminar el libro** → Verificar que se elimina correctamente

### ✅ Tests de Validación

6. **Crear libro sin ISBN** → Debe fallar (400)
7. **Crear libro con ISBN duplicado** → Debe fallar (409)
8. **Crear libro con año inválido** (ej: 500) → Debe fallar (400)
9. **Crear libro con género inválido** → Debe fallar (400)
10. **Crear libro con más de 3 géneros** → Debe fallar (400)

### ✅ Tests de Filtros

11. **Filtrar por género "fantasía"** → Solo libros de fantasía
12. **Filtrar disponible=true** → Solo libros con stock > 0
13. **Buscar por autor "Tolkien"** → Solo libros de Tolkien
14. **Buscar por título "Quijote"** → Libros con "quijote" en el título

### ✅ Tests de Paginación

15. **Obtener página 1 con limit=5** → 5 libros
16. **Obtener página 2 con limit=5** → Siguientes 5 libros
17. **Verificar totalItems** → Debe ser 25 (después del seed)

### ✅ Tests de Errores

18. **Obtener libro con ID inválido** → 400
19. **Obtener libro con ID inexistente** → 404
20. **Actualizar libro inexistente** → 404
21. **Eliminar libro inexistente** → 404

---

## 📊 Status Codes Esperados

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| 200 | OK | GET, PATCH, DELETE exitoso |
| 201 | Created | POST exitoso |
| 400 | Bad Request | Validación fallida o ID inválido |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | ISBN duplicado |
| 500 | Server Error | Error interno del servidor |

---

## 🔧 Colección Postman (JSON)

Si usas Postman, puedes importar esta colección:

```json
{
  "info": {
    "name": "Biblioteca API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Libros",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/v1/libros/get/all"
      }
    },
    {
      "name": "Get Libro by ID",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/v1/libros/get/{{libro_id}}"
      }
    },
    {
      "name": "Create Libro",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"isbn\": \"9781234567890\",\n  \"titulo\": \"Test Libro\",\n  \"autor\": \"Test Autor\",\n  \"editorial\": \"Test Editorial\",\n  \"anioPublicacion\": 2024,\n  \"generos\": [\"ficción\"],\n  \"numeroPaginas\": 300,\n  \"descripcion\": \"Test description\",\n  \"idioma\": \"español\",\n  \"precio\": 19.99,\n  \"stock\": 10\n}"
        },
        "url": "http://localhost:3000/api/v1/libros/post"
      }
    },
    {
      "name": "Update Libro",
      "request": {
        "method": "PATCH",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"stock\": 15,\n  \"precio\": 17.99\n}"
        },
        "url": "http://localhost:3000/api/v1/libros/update/{{libro_id}}"
      }
    },
    {
      "name": "Delete Libro",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/api/v1/libros/delete/{{libro_id}}"
      }
    }
  ]
}
```

---

## 💡 Tips para Testing

1. **Usa variables de entorno** en Postman para el `libro_id`
2. **Guarda respuestas** para extraer IDs automáticamente
3. **Crea un libro de prueba** antes de testear UPDATE/DELETE
4. **Ejecuta el seed** si necesitas resetear los datos
5. **Verifica en MongoDB Atlas** los cambios directamente en la BD

---

**¡Listo para testear! 🚀**

