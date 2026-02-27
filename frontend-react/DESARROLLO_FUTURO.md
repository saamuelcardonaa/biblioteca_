# 🛠️ Guía de Desarrollo Futuro

## Convenciones Establecidas

### 1. **Estructura de Componentes**

```
src/components/
├── common/              # Componentes reutilizables
│   ├── Loader.tsx       # Spinner + mensaje
│   ├── ErrorAlert.tsx   # Alerta de error
│   ├── SuccessAlert.tsx # Alerta de éxito
│   ├── EmptyState.tsx   # Sin resultados
│   └── [NuevosComunes]  # Para agregar aquí
├── [NombrePagina]/      # Opcional: agrupar por página
│   ├── Component1.tsx
│   └── Component2.tsx
├── Home.tsx             # Páginas principales
├── LibroBoard.tsx
├── LibroCard.tsx
├── LibroDetalle.tsx
├── LibroForm.tsx
├── Navbar.tsx
└── Footer.tsx
```

### 2. **Creación de Nuevos Componentes Comunes**

Si necesitas un componente reutilizable:

**Ubicación**: `src/components/common/NuevoComponente.tsx`

**Template**:
```tsx
// componentes/common/NuevoComponente.tsx
interface Props {
  prop1: string
  prop2?: number
  onAction?: () => void
}

export default function NuevoComponente({ prop1, prop2, onAction }: Props) {
  return (
    <div className="nuevo-componente">
      {/* Contenido */}
    </div>
  )
}
```

**CSS en App.css**:
```css
.nuevo-componente {
  /* estilos */
}

.nuevo-componente__child {
  /* subelementos */
}

.nuevo-componente:hover {
  /* estado hover */
}

@media (max-width: 576px) {
  .nuevo-componente { /* responsive */ }
}
```

**Uso en componentes**:
```tsx
import NuevoComponente from './common/NuevoComponente'

export default function MiComponente() {
  return (
    <NuevoComponente 
      prop1="valor" 
      onAction={() => console.log('hecho')} 
    />
  )
}
```

### 3. **Convenciones de CSS**

#### **Nomenclatura BEM simplificada**
```css
/* Bloque principal */
.my-component { }

/* Elemento hijo */
.my-component__title { }
.my-component__body { }

/* Estado */
.my-component:hover { }
.my-component.is-loading { }
.my-component.is-disabled { }

/* Variante */
.my-component--small { }
.my-component--dark { }
```

#### **Uso de Variables CSS**
```css
/* ✅ Usar variables globales */
color: var(--text-primary);
background: var(--bg-card);
box-shadow: var(--shadow-md);

/* ❌ No hardcodear colores */
color: #e8e8ea;
background: #3c3c43;
```

#### **Responsive primero**
```css
/* Mobile first */
.component { 
  font-size: 1rem;
}

@media (min-width: 768px) {
  .component {
    font-size: 1.1rem;
  }
}

@media (min-width: 1024px) {
  .component {
    font-size: 1.25rem;
  }
}
```

### 4. **Patrones de Estados**

#### **Loading**
```tsx
{loading ? (
  <Loader text="Cargando..." />
) : (
  <div>Contenido</div>
)}
```

#### **Error**
```tsx
{error && (
  <ErrorAlert message={error} onDismiss={() => setError(null)} />
)}
```

#### **Éxito**
```tsx
{success && (
  <SuccessAlert message={success} onDismiss={() => setSuccess(null)} />
)}
```

#### **Vacío**
```tsx
{items.length === 0 ? (
  <EmptyState icon="bi-inbox" message="No hay elementos" />
) : (
  <div>{/* contenido */}</div>
)}
```

### 5. **Importaciones Ordenadas**

```tsx
// 1. React imports
import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'

// 2. React Router
import { useNavigate, useParams } from 'react-router-dom'

// 3. Componentes locales
import MyComponent from './MyComponent'
import Loader from './common/Loader'
import ErrorAlert from './common/ErrorAlert'

// 4. Servicios
import myService from '../services/myService'

// 5. Types
import type { MyType } from '../types'
```

---

## 🎨 Extensiones de CSS Sugeridas

### Theme Support (Futuro)
```css
:root {
  /* current theme */
}

:root[data-theme="light"] {
  --primary: #ffffff;
  /* ... */
}

:root[data-theme="dark"] {
  --primary: #1a1a1d;
  /* ... */
}
```

### Animations (Futuro)
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in { animation: fadeIn 0.3s ease-in; }
```

### Utilities (Futuro)
```css
.text-center { text-align: center; }
.mt-2 { margin-top: 0.5rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
```

---

## 📝 Checklist para Nuevas Features

Cuando agregues una nueva funcionalidad:

- [ ] Crear componente en carpeta apropiada
- [ ] Agregar clases CSS a `App.css`
- [ ] Usar variables CSS (--primary, --accent, etc.)
- [ ] Incluir responsive en `@media` queries
- [ ] Usar componentes `common/` si es reutilizable
- [ ] Sin estilos inline (usar clases)
- [ ] TypeScript types correctamente tipados
- [ ] Importaciones ordenadas (React, Router, Componentes, Servicios, Types)
- [ ] Testear en mobile/tablet/desktop
- [ ] Sin cambios en lógica de API

---

## 🔄 Refactoring Futuro Sugerido

### 1. **Contextualizar Estados Globales**
```tsx
// UserContext.tsx
const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
```

### 2. **Custom Hooks**
```tsx
// hooks/useFetch.ts
export function useFetch(url: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e); setLoading(false); })
  }, [url])
  
  return { data, loading, error }
}
```

### 3. **Error Boundaries**
```tsx
// ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error)
  }
  
  render() {
    return <div>Error</div>
  }
}
```

### 4. **Lazy Loading**
```tsx
const Home = lazy(() => import('./pages/Home'))
const LibroBoard = lazy(() => import('./pages/LibroBoard'))
```

---

## 📚 Estructura de Carpetas Recomendada (Futuro)

```
src/
├── components/
│   ├── common/              # Componentes reutilizables
│   ├── Layout/              # Navbar, Footer, Sidebar
│   ├── pages/               # Páginas principales
│   │   ├── Home.tsx
│   │   ├── LibroBoard/
│   │   │   ├── LibroBoard.tsx
│   │   │   └── components/
│   │   │       └── LibroCard.tsx
│   │   ├── LibroDetalle/
│   │   └── LibroForm/
│   └── forms/               # Formularios reutilizables
├── hooks/                   # Custom hooks
│   ├── useFetch.ts
│   └── useNotification.ts
├── utils/                   # Funciones utilitarias
│   ├── validators.ts
│   └── formatters.ts
├── services/                # API calls (sin cambios)
├── types/                   # TypeScript types
│   └── libro.ts
├── context/                 # React Context (futuro)
│   └── UserContext.tsx
├── App.tsx
├── App.css
└── main.tsx
```

---

## 🎯 Mejores Prácticas Establecidas

### ✅ Hacer
```tsx
// 1. Usar componentes comunes
import Loader from './common/Loader'

// 2. Usar clases CSS
<div className="my-component">

// 3. Usar variables CSS
color: var(--primary)

// 4. Responsive primero
@media (max-width: 576px)

// 5. TypeScript types
interface Props { ... }

// 6. Nombrar imports explícitamente
import { useState } from 'react'
```

### ❌ Evitar
```tsx
// 1. Spinner inline (usar <Loader />)
<div className="spinner-border">

// 2. Estilos inline
style={{ color: 'red' }}

// 3. Colores hardcodeados
color: '#ff0000'

// 4. Media queries vacías
@media print

// 5. Any types
const data: any = {}

// 6. Default imports inconsistentes
import React from 'react'
```

---

## 🚀 Próximos Pasos Recomendados

1. **Inmediato**
   - [ ] Agregar más componentes comunes (Modal, Spinner variants)
   - [ ] Crear custom hooks (useFetch, useForm)

2. **Corto plazo**
   - [ ] Implementar Context para estado global
   - [ ] Agregar tests unitarios
   - [ ] Modo claro (light theme)

3. **Mediano plazo**
   - [ ] Refactorizar a estructura por páginas
   - [ ] Error Boundaries
   - [ ] Lazy loading de rutas

4. **Largo plazo**
   - [ ] Temas dinámicos
   - [ ] Internacionalización (i18n)
   - [ ] PWA support

---

## 📖 Referencias a Documentación Existente

- [UI_UX_REDESIGN.md](./UI_UX_REDESIGN.md) - Detalle de cambios
- [CAMBIOS_DETALLADOS.md](./CAMBIOS_DETALLADOS.md) - Antes y después
- [App.css](./src/App.css) - Clases y variables disponibles

---

## ❓ Preguntas Frecuentes

### P: ¿Dónde pongo un nuevo componente reutilizable?
**R**: En `src/components/common/NuevoComponente.tsx` con sus estilos en `App.css`

### P: ¿Puedo usar estilos inline?
**R**: Solo en casos excepcionales dinámicos. Preferir clases CSS.

### P: ¿Cómo agrego responsive?
**R**: Con `@media (max-width: 576px)` en `App.css`

### P: ¿Cambio algo en API?
**R**: No. Endpoints y modelos son inmutables. Solo UI/UX.

### P: ¿Qué tipo de componentes van en `common/`?
**R**: Componentes usados en 2+ lugares (Loader, Alert, Button, Modal, etc.)

---

## 🔗 Recursos

- [Bootstrap 5 Docs](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Última actualización**: Feb 2026  
**Versión**: 1.0 (Post Redesign)  
**Estado**: ✅ Listo para producción
