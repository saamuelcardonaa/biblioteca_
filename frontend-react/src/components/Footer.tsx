// Componente de pie de página profesional
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #2C3E50 0%, #1a252f 100%)',
      color: 'white',
      marginTop: 'auto',
      boxShadow: '0 -4px 6px rgba(0,0,0,0.1)'
    }}>
      <div className="container py-5">
        <div className="row g-4">
          {/* Información del proyecto */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-book-fill me-2"></i>
              Biblioteca MEAN
            </h5>
            <p className="text-white-50 mb-3">
              Sistema de gestión de biblioteca full-stack con arquitectura MEAN.
              Desarrollado como proyecto integrador académico.
            </p>
            <div className="d-flex gap-2">
              <i className="bi bi-github" style={{ fontSize: '1.5rem', cursor: 'pointer', opacity: 0.7 }}></i>
              <i className="bi bi-linkedin" style={{ fontSize: '1.5rem', cursor: 'pointer', opacity: 0.7 }}></i>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white-50 text-decoration-none d-flex align-items-center">
                  <i className="bi bi-house me-2"></i>
                  Inicio
                </a>
              </li>
              <li className="mb-2">
                <a href="/libros" className="text-white-50 text-decoration-none d-flex align-items-center">
                  <i className="bi bi-journals me-2"></i>
                  Catálogo de Libros
                </a>
              </li>
              <li className="mb-2">
                <a href="/libros/nuevo" className="text-white-50 text-decoration-none d-flex align-items-center">
                  <i className="bi bi-plus-circle me-2"></i>
                  Agregar Libro
                </a>
              </li>
            </ul>
          </div>

          {/* Tecnologías */}
          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Tecnologías</h6>
            <div className="d-flex flex-wrap gap-2">
              <span className="badge bg-success">Node.js</span>
              <span className="badge bg-success">Express</span>
              <span className="badge bg-success">MongoDB</span>
              <span className="badge bg-info">React</span>
              <span className="badge bg-danger">Angular</span>
              <span className="badge bg-primary">TypeScript</span>
              <span className="badge bg-secondary">Bootstrap 5</span>
            </div>
            <p className="text-white-50 mt-3 small mb-0">
              <i className="bi bi-code-slash me-1"></i>
              Proyecto académico - Desarrollo de Aplicaciones Web
            </p>
          </div>
        </div>

        {/* Separador */}
        <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Copyright */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <small className="text-white-50">
              © {currentYear} Biblioteca MEAN. Proyecto Integrador.
            </small>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <small className="text-white-50">
              Desarrollado por <strong className="text-white">Luis</strong>
            </small>
          </div>
        </div>
      </div>
    </footer>
  )
}
