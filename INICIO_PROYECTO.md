# 🚀 INICIO RÁPIDO - Proyecto Biblioteca Completo

## ✅ Todo está implementado y listo para usar

Este documento te guía para iniciar el proyecto completo en menos de 5 minutos.

---

## 📋 Pre-requisitos

Antes de empezar, asegúrate de tener instalado:

- ✅ **Node.js** v16+ (https://nodejs.org/)
- ✅ **MongoDB** v6+ (https://www.mongodb.com/try/download/community)
- ✅ **Git** (opcional, para clonar el repo)

---

## 🎯 Inicio en 3 Pasos

### PASO 1: Iniciar MongoDB

```bash
# En una terminal, inicia MongoDB:
mongod

# O si usas MongoDB como servicio:
# Ya debería estar corriendo automáticamente
```

### PASO 2: Iniciar el Backend

```bash
# Abre una nueva terminal
cd backend

# Si es la primera vez, instala dependencias:
npm install

# Carga datos de prueba (solo la primera vez):
npm run seed

# Inicia el servidor:
npm start
```

**✅ Backend corriendo en:** `http://localhost:3000`

### PASO 3: Iniciar Frontend(s)

Puedes elegir iniciar React, Angular o ambos:

#### Opción A: Frontend React

```bash
# Abre una nueva terminal
cd frontend-react

# Si es la primera vez, instala dependencias:
npm install

# Inicia el servidor:
npm run dev
```

**✅ React corriendo en:** `http://localhost:3001`

#### Opción B: Frontend Angular

```bash
# Abre una nueva terminal
cd frontend-angular

# Si es la primera vez, instala dependencias:
npm install

# Inicia el servidor:
npm start
```

**✅ Angular corriendo en:** `http://localhost:4200`

#### Opción C: Ambos Frontends (Recomendado)

Abre dos terminales más y ejecuta ambos frontends simultáneamente.

---

## 🌐 URLs de Acceso

Una vez todo esté corriendo:

| Componente | URL | Descripción |
|------------|-----|-------------|
| **Backend API** | http://localhost:3000 | API REST |
| **API Docs** | http://localhost:3000/api/v1 | Documentación endpoints |
| **Frontend React** | http://localhost:3001 | Cliente React |
| **Frontend Angular** | http://localhost:4200 | Cliente Angular |

---

## 📱 Probar la Aplicación

### En React (http://localhost:3001)

1. **Home** - Verás la página de bienvenida con cards
2. **Ver Libros** - Click en "Ver Todos los Libros"
3. **Filtrar** - Usa los filtros superiores
4. **Ver Detalle** - Click en cualquier libro
5. **Crear** - Click en "Agregar Nuevo Libro"
6. **Editar** - Click en el botón de editar (lápiz)
7. **Eliminar** - Click en el botón de eliminar (basura)

### En Angular (http://localhost:4200)

1. **Home** - Verás la página de bienvenida con información
2. **Libros** - Click en "Libros" en el navbar
3. **Tabla** - Verás tabla con paginación
4. **Filtros** - Usa la sección de filtros
5. **Ver** - Click en el botón "Ver" (ojo azul)
6. **Crear** - Click en "Nuevo Libro" en el navbar
7. **Editar** - Click en el botón "Editar" (lápiz amarillo)
8. **Eliminar** - Click en el botón "Eliminar" (basura roja)

---

## 🎨 Diferencias entre React y Angular

Ambos consumen la **misma API** pero tienen interfaces diferentes:

| Aspecto | React | Angular |
|---------|-------|---------|
| **Vista principal** | Cards (tarjetas) | Tabla |
| **Diseño** | Más visual, tipo Pinterest | Más tabular, tipo Excel |
| **Filtros** | En la parte superior | En card separado |
| **Formularios** | Formularios controlados | Formularios reactivos |
| **Navegación** | React Router | Angular Router |
| **HTTP** | Axios | HttpClient |

**Elige el que prefieras para tu demostración** ✅

---

## 🐛 Solución de Problemas

### Problema: "Puerto ya en uso"

**Backend (3000):**
```bash
# Cambia el puerto en backend/.env:
PORT=3001
```

**React (3001):**
```bash
# En frontend-react/package.json, cambia el script:
"dev": "vite --port 3002"
```

**Angular (4200):**
```bash
ng serve --port 4300
```

### Problema: "No carga los libros"

1. Verifica que MongoDB esté corriendo:
   ```bash
   mongod --version
   ```

2. Verifica que el backend esté corriendo:
   ```bash
   # Abre: http://localhost:3000/api/v1
   # Deberías ver documentación
   ```

3. Verifica que haya datos:
   ```bash
   cd backend
   npm run seed
   ```

### Problema: Error de CORS

En `backend/src/app.js`, verifica que CORS permita ambos frontends:

```javascript
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:4200']
}));
```

### Problema: "Module not found"

```bash
# En la carpeta correspondiente:
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Comandos Útiles

### Backend

```bash
cd backend
npm install          # Instalar dependencias
npm run seed        # Cargar datos de prueba
npm start           # Iniciar servidor
npm run dev         # Iniciar con nodemon (desarrollo)
```

### Frontend React

```bash
cd frontend-react
npm install         # Instalar dependencias
npm run dev        # Iniciar servidor desarrollo
npm run build      # Compilar para producción
npm run preview    # Vista previa de producción
```

### Frontend Angular

```bash
cd frontend-angular
npm install        # Instalar dependencias
npm start          # Iniciar servidor desarrollo
npm run build     # Compilar para producción
ng serve          # Alternativa a npm start
```

---

## ✅ Checklist de Inicio

Antes de empezar a trabajar, verifica:

- [ ] MongoDB está instalado y corriendo
- [ ] Node.js está instalado (v16+)
- [ ] Has clonado/descargado el proyecto
- [ ] Backend inicia sin errores
- [ ] Frontend(s) inicia(n) sin errores
- [ ] Puedes ver libros en el navegador
- [ ] Los filtros funcionan
- [ ] Puedes crear un nuevo libro
- [ ] Puedes editar un libro
- [ ] Puedes eliminar un libro

---

## 🎯 Flujo de Trabajo Típico

### Desarrollo Normal

```bash
# Terminal 1: MongoDB (si no es servicio)
mongod

# Terminal 2: Backend
cd backend
npm start

# Terminal 3: React (opcional)
cd frontend-react
npm run dev

# Terminal 4: Angular (opcional)
cd frontend-angular
npm start
```

### Probar Cambios en el Backend

1. Modifica el código en `backend/src/`
2. Reinicia el servidor (`Ctrl+C` y `npm start`)
3. Recarga el navegador

### Probar Cambios en React

1. Modifica el código en `frontend-react/src/`
2. Los cambios se recargan automáticamente (hot reload)

### Probar Cambios en Angular

1. Modifica el código en `frontend-angular/src/`
2. Los cambios se recargan automáticamente (hot reload)

---

## 📚 Documentación Disponible

Cuando tengas dudas, consulta:

### General
- `README.md` - Visión general del proyecto
- `PROYECTO_COMPLETO.md` - Resumen ejecutivo completo
- `INICIO_RAPIDO.md` - Este archivo

### Backend
- `backend/README.md` - Guía del backend
- `backend/API_TESTING.md` - Probar con Postman
- `backend/MONGODB_SETUP.md` - Configurar MongoDB

### React
- `frontend-react/README.md` - Guía de React
- `frontend-react/COMPLETADO.md` - Estado del proyecto

### Angular
- `frontend-angular/README.md` - Guía original
- `frontend-angular/ANGULAR_README.md` - Documentación técnica
- `frontend-angular/INICIO_RAPIDO.md` - Inicio rápido Angular
- `frontend-angular/ANGULAR_COMPLETADO.md` - Estado del proyecto

---

## 🎓 Datos de Prueba

Después de ejecutar `npm run seed`, tendrás:

- **20+ libros** con datos reales
- **Géneros variados**: Ficción, No Ficción, Ciencia, etc.
- **Diferentes estados**: Disponibles y no disponibles
- **Precios variados**: Desde 10€ hasta 35€
- **Stocks variados**: Algunos con stock, otros sin stock

Estos datos te permiten probar:
- ✅ Paginación (más de 10 libros)
- ✅ Filtros (diferentes géneros)
- ✅ Búsqueda (títulos y autores variados)
- ✅ Edición (modificar existentes)
- ✅ Eliminación (borrar algunos)

---

## 🎉 ¡Listo para Empezar!

Sigue estos pasos:

1. ✅ **Abre 3-4 terminales**
2. ✅ **Inicia MongoDB** (si no es servicio)
3. ✅ **Inicia Backend** (`cd backend && npm start`)
4. ✅ **Inicia Frontend(s)** (React y/o Angular)
5. ✅ **Abre navegador** en las URLs correspondientes
6. ✅ **¡Explora la aplicación!**

---

## 🚀 Próximos Pasos

Una vez que todo funcione:

### Para Desarrollo
1. Experimenta creando libros
2. Prueba los filtros y búsqueda
3. Edita y elimina libros
4. Verifica validaciones
5. Prueba paginación

### Para Entrega
1. Toma capturas de pantalla
2. Documenta las pruebas realizadas
3. Prepara el informe final
4. Considera hacer deploy (opcional)

---

## 💡 Tips Finales

1. **Usa ambos frontends** - Muestra que sabes React Y Angular
2. **Prueba todo** - No dejes funcionalidades sin probar
3. **Documenta errores** - Si encuentras bugs, anótalos
4. **Haz capturas** - Necesitarás evidencia visual
5. **Prepara demo** - Ten lista una demostración en vivo

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:

1. **Revisa la consola** del navegador (F12)
2. **Revisa la terminal** donde corre el servidor
3. **Consulta la documentación** específica de cada componente
4. **Verifica requisitos previos** (Node, MongoDB, puertos)

---

# ✅ PROYECTO 100% FUNCIONAL

Todo está implementado y probado. Solo necesitas:

1. Ejecutar los comandos
2. Abrir el navegador
3. ¡Disfrutar de tu aplicación!

---

**Stack:** MongoDB + Express + Angular + Node.js + React  
**Estado:** ✅ LISTO PARA USAR  
**Tiempo de inicio:** 5 minutos  

**¡Éxito con tu proyecto!** 🎊

