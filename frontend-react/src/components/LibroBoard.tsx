import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LibroCard from './LibroCard'
import libroService from '../services/libroService'
import type { Libro } from '../services/libroService'

export default function LibroBoard() {
  const navigate = useNavigate()

  // Estados
  const [libros, setLibros] = useState<Libro[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Estados de paginación y filtros
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [limit] = useState(12)

  // Estados de filtros
  const [generoFilter, setGeneroFilter] = useState('')
  const [disponibleFilter, setDisponibleFilter] = useState<boolean | undefined>(undefined)
  const [searchText, setSearchText] = useState('')
  const [autorFilter, setAutorFilter] = useState('')

  // Géneros disponibles
  const generos = [
    'ficción', 'no ficción', 'novela', 'ciencia ficción', 'fantasía',
    'thriller', 'misterio', 'romance', 'histórico', 'biografía',
    'autoayuda', 'tecnología', 'ciencia', 'poesía', 'drama',
    'terror', 'aventura', 'policial', 'filosofía', 'ensayo'
  ]

  // Cargar libros cuando cambie página o filtros
  useEffect(() => {
    loadLibros()
  }, [currentPage, generoFilter, disponibleFilter, searchText, autorFilter])

  // Función para cargar libros
  async function loadLibros() {
    setLoading(true)
    setError(null)

    try {
      const response = await libroService.getAllLibros(
        currentPage,
        limit,
        generoFilter,
        disponibleFilter,
        searchText,
        autorFilter
      )

      setLibros(response.data)
      setTotalPages(response.pagination.totalPages)
      setTotalItems(response.pagination.totalItems)
      setCurrentPage(response.pagination.currentPage)
    } catch (err: any) {
      setError(err?.message || 'Error al cargar libros')
    } finally {
      setLoading(false)
    }
  }

  // Función para eliminar libro
  async function handleDelete(id: string, titulo: string) {
    if (!window.confirm(`¿Estás seguro de eliminar "${titulo}"?`)) {
      return
    }

    try {
      await libroService.deleteLibro(id)
      setSuccessMessage(`Libro "${titulo}" eliminado exitosamente`)
      setTimeout(() => setSuccessMessage(null), 3000)
      loadLibros() // Recargar lista
    } catch (err: any) {
      setError(err?.message || 'Error al eliminar libro')
      setTimeout(() => setError(null), 5000)
    }
  }

  // Función para ir a detalle
  function handleViewDetail(id: string) {
    navigate(`/libros/${id}`)
  }

  // Función para ir a editar
  function handleEdit(id: string) {
    navigate(`/libros/editar/${id}`)
  }

  // Limpiar filtros
  function clearFilters() {
    setGeneroFilter('')
    setDisponibleFilter(undefined)
    setSearchText('')
    setAutorFilter('')
    setCurrentPage(1)
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📚 Catálogo de Libros</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/libros/nuevo')}
        >
          <i className="bi bi-plus-circle"></i> Agregar Libro
        </button>
      </div>

      {/* Mensajes */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" onClick={() => setSuccessMessage(null)}></button>
        </div>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {/* Filtros */}
      <div className="card mb-4 border-0 shadow-sm" style={{
        borderLeft: '4px solid var(--accent)'
      }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">
              <i className="bi bi-funnel-fill me-2"></i>
              Filtros y Búsqueda
            </h5>
            <span className="badge bg-primary">
              {totalItems} libros encontrados
            </span>
          </div>
          <div className="row g-3">
            {/* Búsqueda por título */}
            <div className="col-md-3">
              <label className="form-label">Buscar por título</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Quijote"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>

            {/* Búsqueda por autor */}
            <div className="col-md-3">
              <label className="form-label">Buscar por autor</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: García Márquez"
                value={autorFilter}
                onChange={(e) => {
                  setAutorFilter(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>

            {/* Filtro por género */}
            <div className="col-md-3">
              <label className="form-label">Género</label>
              <select
                className="form-select"
                value={generoFilter}
                onChange={(e) => {
                  setGeneroFilter(e.target.value)
                  setCurrentPage(1)
                }}
              >
                <option value="">Todos los géneros</option>
                {generos.map((genero) => (
                  <option key={genero} value={genero}>
                    {genero.charAt(0).toUpperCase() + genero.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por disponibilidad */}
            <div className="col-md-2">
              <label className="form-label">Disponibilidad</label>
              <select
                className="form-select"
                value={disponibleFilter === undefined ? '' : disponibleFilter.toString()}
                onChange={(e) => {
                  const value = e.target.value
                  setDisponibleFilter(value === '' ? undefined : value === 'true')
                  setCurrentPage(1)
                }}
              >
                <option value="">Todos</option>
                <option value="true">Disponibles</option>
                <option value="false">No disponibles</option>
              </select>
            </div>

            {/* Botón limpiar */}
            <div className="col-md-1 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearFilters}
                title="Limpiar filtros"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Información y loader */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          Mostrando <strong>{libros.length}</strong> de <strong>{totalItems}</strong> libros
        </div>
        {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        )}
      </div>

      {/* Grid de libros */}
      {loading && libros.length === 0 ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando libros...</p>
        </div>
      ) : libros.length === 0 ? (
        <div className="alert alert-info text-center">
          No se encontraron libros con los filtros aplicados.
        </div>
      ) : (
        <div className="row g-4 mb-4">
          {libros.map((libro) => (
            <div key={libro._id} className="col-md-6 col-lg-4">
              <LibroCard
                libro={libro}
                onDelete={handleDelete}
                onViewDetail={handleViewDetail}
                onEdit={handleEdit}
              />
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <nav aria-label="Paginación de libros">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1 || loading}
              >
                ← Anterior
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1
              // Mostrar solo algunas páginas alrededor de la actual
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                      disabled={loading}
                    >
                      {page}
                    </button>
                  </li>
                )
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <li key={page} className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )
              }
              return null
            })}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
              >
                Siguiente →
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

