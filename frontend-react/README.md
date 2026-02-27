# 📚 Biblioteca - Frontend React

Frontend en React + TypeScript para el sistema de gestión de biblioteca.

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔧 Configuración

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 📦 Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router** - Navegación
- **Bootstrap 5** - Estilos y componentes
- **Fetch API** - Peticiones HTTP

## 📁 Estructura

```
src/
├── components/
│   ├── Navbar.tsx          # Barra de navegación
│   ├── Footer.tsx          # Pie de página
│   ├── Home.tsx            # Página de inicio
│   ├── PokemonBoard.tsx    # Tablero de libros (pendiente actualizar)
│   ├── PokemonCard.tsx     # Tarjeta de libro (pendiente actualizar)
│   └── PokemonForm.tsx     # Formulario de libro (pendiente actualizar)
├── services/
│   └── libroService.ts     # Servicio API de libros
├── App.tsx                 # Componente principal
├── main.tsx               # Punto de entrada
└── index.css              # Estilos globales
```

## 🎯 Estado Actual

### ✅ Completado
- [x] Servicio de API (libroService.ts)
- [x] Navbar actualizado
- [x] Home actualizado
- [x] Configuración de rutas

### 🔄 Pendiente
- [ ] Actualizar PokemonBoard a LibroBoard
- [ ] Actualizar PokemonCard a LibroCard
- [ ] Actualizar PokemonForm a LibroForm
- [ ] Implementar CRUD completo
- [ ] Implementar filtros y búsqueda
- [ ] Implementar paginación

## 🌐 URL

Servidor de desarrollo: http://localhost:5173

