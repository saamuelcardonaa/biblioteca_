import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import LibroBoard from './components/LibroBoard'
import LibroDetalle from './components/LibroDetalle'
import LibroForm from './components/LibroForm'

function App() {
  // Estado simple para manejar el tema (oscuro por defecto)
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Guardar el tema en localStorage cuando cambie
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    const root = document.getElementById('root')
    if (root) {
      root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    }
  }, [isDarkMode])

  // Función para cambiar el tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <Router>
      {/* Barra de navegación fija en la parte superior */}
      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* Contenido principal con rutas */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/libros" element={<LibroBoard />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
          <Route path="/libros/nuevo" element={<LibroForm />} />
          <Route path="/libros/editar/:id" element={<LibroForm />} />
        </Routes>
      </main>

      {/* Pie de página fijo en la parte inferior */}
      <Footer />
    </Router>
  )
}

export default App
