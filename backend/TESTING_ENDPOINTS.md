# 🧪 Testing de Endpoints - Biblioteca API

Este documento explica cómo probar todos los endpoints de la API de forma local.

---

## 📋 Prerequisitos

1. **MongoDB** debe estar corriendo
2. **Variables de entorno** configuradas en `backend/.env`
3. **Dependencias instaladas**: `npm install` en `/backend`

---

## 🚀 Pasos para Probar los Endpoints

### 1. Iniciar el Servidor Backend

Abre una terminal en la carpeta `backend`:


Deberías ver:
```
✅ Servidor corriendo en puerto 3000
📍 http://localhost:3000/api/v1
```

### 2. Ejecutar el Script de Pruebas

**Abre otra terminal nueva** (deja la anterior con el servidor corriendo) y ejecuta:



El script probará automáticamente:
- ✅ Documentación y Health Check
- ✅ Listar libros con diferentes filtros
- ✅ Obtener libro por ID
- ✅ Crear libro nuevo
- ✅ Actualizar libro
- ✅ Eliminar libro
- ✅ Validaciones y manejo de errores

---

## 📊 Endpoints que se Prueban

### 1. Documentación
- `GET /` - Documentación general
- `GET /api/v1` - Documentación API v1
- `GET /health` - Health check

### 2. Listar Libros (GET)
- `GET /api/v1/libros/get/all` - Todos los libros
- `GET /api/v1/libros/get/all?page=1&limit=5` - Con paginación
- `GET /api/v1/libros/get/all?genero=ficción` - Filtrar por género
- `GET /api/v1/libros/get/all?disponible=true` - Filtrar por disponibilidad
- `GET /api/v1/libros/get/all?search=hobbit` - Buscar en título
- `GET /api/v1/libros/get/all?autor=Tolkien` - Buscar por autor

### 3. Obtener Libro por ID (GET)
- `GET /api/v1/libros/get/:id` - Obtener libro específico

### 4. Crear Libro (POST)
- `POST /api/v1/libros/post` - Crear nuevo libro

**Body de ejemplo:**
```json
{
  "isbn": "9780000000001",
  "titulo": "Libro de Prueba",
  "autor": "Autor Test",
  "editorial": "Editorial Test",
  "anioPublicacion": 2026,
  "generos": ["ficción", "novela"],
  "numeroPaginas": 250,
  "descripcion": "Descripción del libro",
  "idioma": "español",
  "precio": 19.99,
  "stock": 5,
  "disponible": true,
  "portada": "https://example.com/portada.jpg"
}
```

### 5. Actualizar Libro (PATCH)
- `PATCH /api/v1/libros/update/:id` - Actualizar libro existente

**Body de ejemplo:**
```json
{
  "titulo": "Nuevo Título",
  "precio": 24.99,
  "stock": 10
}
```

### 6. Eliminar Libro (DELETE)
- `DELETE /api/v1/libros/delete/:id` - Eliminar libro

### 7. Validaciones
- Crear libro con datos inválidos → Debe dar 400
- Crear libro con ISBN duplicado → Debe dar 409
- Obtener libro con ID inexistente → Debe dar 404

---

## 🔍 Pruebas Manuales con PowerShell

Si prefieres probar manualmente, aquí están los comandos:

### GET - Root
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/" -Method Get | ConvertTo-Json
```

### GET - Listar Libros
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/libros/get/all?page=1&limit=10" | ConvertTo-Json
```

### GET - Libro por ID
```powershell
$id = "TU_ID_AQUI"
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/libros/get/$id" | ConvertTo-Json
```

### POST - Crear Libro
```powershell
$body = @{
    isbn = "9780000000001"
    titulo = "Libro de Prueba"
    autor = "Autor Test"
    editorial = "Editorial Test"
    anioPublicacion = 2026
    generos = @("ficción")
    numeroPaginas = 200
    descripcion = "Descripción"
    precio = 15.99
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/libros/post" -Method Post -Body $body -ContentType "application/json" | ConvertTo-Json
```

### PATCH - Actualizar Libro
```powershell
$id = "TU_ID_AQUI"
$body = @{
    precio = 24.99
    stock = 10
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/libros/update/$id" -Method Patch -Body $body -ContentType "application/json" | ConvertTo-Json
```

### DELETE - Eliminar Libro
```powershell
$id = "TU_ID_AQUI"
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/libros/delete/$id" -Method Delete | ConvertTo-Json
```

---

## 🧪 Pruebas con cURL (alternativa)

### GET - Root
```bash
curl http://localhost:3000/
```

### GET - Listar Libros
```bash
curl "http://localhost:3000/api/v1/libros/get/all?page=1&limit=10"
```

### POST - Crear Libro
```bash
curl -X POST http://localhost:3000/api/v1/libros/post \
  -H "Content-Type: application/json" \
  -d '{
    "isbn": "9780000000001",
    "titulo": "Libro de Prueba",
    "autor": "Autor Test",
    "editorial": "Editorial Test",
    "anioPublicacion": 2026,
    "generos": ["ficción"],
    "numeroPaginas": 200,
    "descripcion": "Descripción",
    "precio": 15.99
  }'
```

### PATCH - Actualizar
```bash
curl -X PATCH http://localhost:3000/api/v1/libros/update/ID_AQUI \
  -H "Content-Type: application/json" \
  -d '{"precio": 24.99}'
```

### DELETE - Eliminar
```bash
curl -X DELETE http://localhost:3000/api/v1/libros/delete/ID_AQUI
```

---

## 📊 Resultado Esperado del Script

Al ejecutar `test-endpoints.ps1`, verás:

```
========================================
  PRUEBA DE ENDPOINTS - BIBLIOTECA API
========================================

========================================
1. DOCUMENTACIÓN
========================================

📍 Testing: Root - Documentación general
   Method: GET http://localhost:3000/
   ✅ SUCCESS - Status: 200
   Response: {"success":true,"message":"Biblioteca API..."}

📍 Testing: API v1 - Documentación
   Method: GET http://localhost:3000/api/v1
   ✅ SUCCESS - Status: 200

...

========================================
  RESUMEN DE PRUEBAS
========================================

✅ Pruebas exitosas: 15 / 15
❌ Pruebas fallidas: 0 / 15

🎉 ¡Todos los endpoints funcionan correctamente!
```

---

## ⚠️ Solución de Problemas

### Error: "Cannot connect to localhost:3000"
**Causa:** El servidor backend no está corriendo.  
**Solución:** Ejecuta `npm start` en `/backend`

### Error: "ECONNREFUSED"
**Causa:** MongoDB no está corriendo.  
**Solución:** Verifica que MongoDB Atlas esté accesible o inicia MongoDB local

### Error: "Module not found"
**Causa:** Dependencias no instaladas.  
**Solución:** Ejecuta `npm install` en `/backend`

### Error: "MONGODB_URI is not defined"
**Causa:** Variables de entorno no configuradas.  
**Solución:** Verifica que `backend/.env` exista y tenga `MONGODB_URI`

---

## 📝 Notas

- El script **crea un libro de prueba** y lo elimina al final
- Todos los endpoints **devuelven JSON**
- Las pruebas son **no destructivas** (excepto el libro temporal)
- El script verifica **códigos de estado y estructura de respuestas**

---

## 🎯 Para Probar en Producción (Vercel)

Cambia `$baseUrl` en el script a:
```powershell
$baseUrl = "https://biblioteca-api-six.vercel.app"
```

O usa el script directamente con Postman/Insomnia importando la colección de endpoints documentada.

---

**Última actualización:** 18 de Febrero, 2026

