import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import libroService from '../services/libroService'
import type { Libro } from '../services/libroService'

export default function LibroDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [libro, setLibro] = useState<Libro | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (id) {
      loadLibro(id)
    }
  }, [id])

  async function loadLibro(libroId: string) {
    setLoading(true)
    setError(null)

    try {
      const response = await libroService.getLibroById(libroId)
      setLibro(response.data)
    } catch (err: any) {
      setError(err?.message || 'Error al cargar el libro')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!libro || !window.confirm(`¿Estás seguro de eliminar "${libro.titulo}"?`)) {
      return
    }

    setDeleting(true)
    try {
      await libroService.deleteLibro(libro._id)
      navigate('/libros')
    } catch (err: any) {
      setError(err?.message || 'Error al eliminar el libro')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando información del libro...</p>
      </div>
    )
  }

  if (error || !libro) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error</h4>
          <p>{error || 'Libro no encontrado'}</p>
          <hr />
          <button className="btn btn-primary" onClick={() => navigate('/libros')}>
            Volver al catálogo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4">
      {/* Botones superiores */}
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <button className="btn btn-secondary" onClick={() => navigate('/libros')}>
          ← Volver al Catálogo
        </button>
        <div className="d-flex gap-2">
          <button
            className="btn btn-warning"
            onClick={() => navigate(`/libros/editar/${libro._id}`)}
          >
            <i className="bi bi-pencil"></i> Editar
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Eliminando...
              </>
            ) : (
              <>
                <i className="bi bi-trash"></i> Eliminar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="row">
        {/* Columna de imagen */}
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            {libro.portada ? (
              <div style={{
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '500px'
              }}>
                <img
                  src={libro.portada}
                  className="card-img-top"
                  alt={`Portada de ${libro.titulo}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '600px',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x600?text=Sin+Portada'
                  }}
                />
              </div>
            ) : (
              <div
                className="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white"
                style={{ height: '500px' }}
              >
                <div className="text-center">
                  <i className="bi bi-book" style={{ fontSize: '5rem' }}></i>
                  <p className="mt-3 mb-0">Sin portada disponible</p>
                </div>
              </div>
            )}
            <div className="card-body text-center">
              {libro.disponible ? (
                <span className="badge bg-success fs-6 w-100">✓ Disponible</span>
              ) : (
                <span className="badge bg-danger fs-6 w-100">✕ No disponible</span>
              )}
            </div>
          </div>
        </div>

        {/* Columna de información */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">{libro.titulo}</h2>
            </div>
            <div className="card-body">
              {/* Autor */}
              <div className="mb-3">
                <h5 className="text-muted mb-0">Autor</h5>
                <h4>{libro.autor}</h4>
              </div>

              {/* Géneros */}
              <div className="mb-3">
                <h6 className="text-muted">Géneros</h6>
                <div>
                  {libro.generos.map((genero) => (
                    <span key={genero} className="badge bg-primary me-2 mb-2">
                      {genero}
                    </span>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <h6 className="text-muted">Descripción</h6>
                <p className="lead">{libro.descripcion}</p>
              </div>

              {/* Detalles en tabla */}
              <h6 className="text-muted">Detalles del Libro</h6>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th style={{ width: '30%' }}>ISBN</th>
                    <td>{libro.isbn}</td>
                  </tr>
                  <tr>
                    <th>Editorial</th>
                    <td>{libro.editorial}</td>
                  </tr>
                  <tr>
                    <th>Año de Publicación</th>
                    <td>{libro.anioPublicacion}</td>
                  </tr>
                  <tr>
                    <th>Número de Páginas</th>
                    <td>{libro.numeroPaginas} páginas</td>
                  </tr>
                  <tr>
                    <th>Idioma</th>
                    <td className="text-capitalize">{libro.idioma}</td>
                  </tr>
                  <tr>
                    <th>Precio</th>
                    <td className="fs-5 fw-bold text-success">{libro.precio.toFixed(2)} €</td>
                  </tr>
                  <tr>
                    <th>Stock</th>
                    <td>
                      <span className={`badge ${libro.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {libro.stock} {libro.stock === 1 ? 'unidad' : 'unidades'}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Disponibilidad</th>
                    <td>
                      {libro.disponible ? (
                        <span className="text-success fw-bold">✓ Disponible para compra</span>
                      ) : (
                        <span className="text-danger fw-bold">✕ No disponible</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Metadatos */}
              <div className="mt-4">
                <h6 className="text-muted">Información del Sistema</h6>
                <table className="table table-sm">
                  <tbody>
                    <tr>
                      <th style={{ width: '30%' }}>ID</th>
                      <td><code>{libro._id}</code></td>
                    </tr>
                    {libro.createdAt && (
                      <tr>
                        <th>Fecha de Creación</th>
                        <td>{new Date(libro.createdAt).toLocaleString('es-ES')}</td>
                      </tr>
                    )}
                    {libro.updatedAt && (
                      <tr>
                        <th>Última Actualización</th>
                        <td>{new Date(libro.updatedAt).toLocaleString('es-ES')}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

