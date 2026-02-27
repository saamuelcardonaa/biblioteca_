import type { Libro } from '../services/libroService'

type Props = {
  libro: Libro
  onDelete: (id: string, titulo: string) => void
  onViewDetail: (id: string) => void
  onEdit: (id: string) => void
}

export default function LibroCard({ libro, onDelete, onViewDetail, onEdit }: Props) {
  return (
    <div className="card book-card h-100">
      {/* Portada del libro */}
      {libro.portada ? (
        <div className="cover-container">
          <img
            src={libro.portada}
            className="card-img-top"
            alt={`Portada de ${libro.titulo}`}
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x400?text=Sin+Portada'
            }}
          />
        </div>
      ) : (
        <div
          className="card-img-top d-flex align-items-center justify-content-center text-white"
          style={{ background: 'linear-gradient(135deg, #7F8C8D 0%, #95A5A6 100%)', height: '300px' }}
        >
          <div className="text-center">
            <i className="bi bi-book" style={{ fontSize: '4rem', opacity: 0.5 }}></i>
            <p className="mt-2 mb-0">Sin portada</p>
          </div>
        </div>
      )}

      <div className="card-body">
        {/* Título */}
        <h5 className="card-title text-truncate fw-bold" title={libro.titulo} style={{ color: 'var(--primary)' }}>
          {libro.titulo}
        </h5>

        {/* Autor */}
        <h6 className="card-subtitle mb-3 text-muted text-truncate" title={libro.autor}>
          <i className="bi bi-person-fill me-1"></i>
          {libro.autor}
        </h6>

        {/* Géneros */}
        <div className="mb-3">
          {libro.generos.slice(0, 2).map((genero) => (
            <span key={genero} className="badge bg-primary me-1 mb-1" style={{ fontSize: '0.75rem' }}>
              {genero}
            </span>
          ))}
          {libro.generos.length > 2 && (
            <span className="badge bg-secondary mb-1" style={{ fontSize: '0.75rem' }}>
              +{libro.generos.length - 2}
            </span>
          )}
        </div>

        {/* Información adicional */}
        <div className="mb-3">
          <div className="info-row">
            <span className="text-muted">
              <i className="bi bi-file-text me-1"></i>Páginas:
            </span>
            <strong>{libro.numeroPaginas}</strong>
          </div>
          <div className="info-row">
            <span className="text-muted">
              <i className="bi bi-calendar-event me-1"></i>Año:
            </span>
            <strong>{libro.anioPublicacion}</strong>
          </div>
          <div className="info-row">
            <span className="text-muted">
              <i className="bi bi-tag me-1"></i>Precio:
            </span>
            <strong style={{ color: 'var(--success)' }}>
              {libro.precio.toFixed(2)} €
            </strong>
          </div>
          <div className="info-row" style={{ borderBottom: 'none' }}>
            <span className="text-muted">
              <i className="bi bi-box-seam me-1"></i>Stock:
            </span>
            <span className={`badge ${libro.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {libro.stock} {libro.stock === 1 ? 'unidad' : 'unidades'}
            </span>
          </div>
        </div>

        {/* Badge de disponibilidad */}
        <div className="mb-3">
          {libro.disponible ? (
            <div className="alert alert-success py-2 mb-0 text-center" style={{ fontSize: '0.875rem' }}>
              <i className="bi bi-check-circle-fill me-1"></i>Disponible
            </div>
          ) : (
            <div className="alert alert-danger py-2 mb-0 text-center" style={{ fontSize: '0.875rem' }}>
              <i className="bi bi-x-circle-fill me-1"></i>No disponible
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="mt-auto">
          <div className="d-grid gap-2">
            <button className="btn btn-info btn-sm" onClick={() => onViewDetail(libro._id)}>
              <i className="bi bi-eye me-1"></i>Ver Detalle
            </button>
            <div className="d-flex gap-2">
              <button className="btn btn-warning btn-sm flex-fill" onClick={() => onEdit(libro._id)}>
                <i className="bi bi-pencil me-1"></i>Editar
              </button>
              <button className="btn btn-danger btn-sm flex-fill" onClick={() => onDelete(libro._id, libro.titulo)}>
                <i className="bi bi-trash me-1"></i>Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

