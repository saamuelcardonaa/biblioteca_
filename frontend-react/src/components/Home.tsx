export default function Home() {
  return (
    <>

      <div style={{
        background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
        color: 'white',
        padding: '4rem 0',
        marginBottom: '3rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <i className="bi bi-book-half" style={{ fontSize: '4rem', marginBottom: '1rem' }}></i>
              <h1 className="display-4 fw-bold mb-3">
                Sistema de Gestión de Biblioteca
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                Proyecto Full-Stack con arquitectura MEAN. Gestiona tu catálogo de libros de forma
                profesional con operaciones CRUD completas, filtros avanzados y más.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <a href="/libros" className="btn btn-light btn-lg px-4 shadow">
                  <i className="bi bi-journals me-2"></i>
                  Ver Catálogo
                </a>
                <a href="/libros/nuevo" className="btn btn-outline-light btn-lg px-4">
                  <i className="bi bi-plus-circle me-2"></i>
                  Agregar Libro
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container py-4">
        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #3498DB, #2980B9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <i className="bi bi-database-fill" style={{ fontSize: '2rem', color: 'white' }}></i>
                </div>
                <h5 className="card-title fw-bold mb-3">Base de Datos MongoDB</h5>
                <p className="card-text text-muted">
                  25+ libros en catálogo con información completa. Sistema CRUD con validaciones
                  y reglas de negocio implementadas.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #27AE60, #229954)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <i className="bi bi-funnel-fill" style={{ fontSize: '2rem', color: 'white' }}></i>
                </div>
                <h5 className="card-title fw-bold mb-3">Filtros Avanzados</h5>
                <p className="card-text text-muted">
                  Busca por título, autor o género. Filtra por disponibilidad.
                  Combina múltiples criterios con paginación integrada.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="mb-3" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #E74C3C, #C0392B)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <i className="bi bi-pencil-square" style={{ fontSize: '2rem', color: 'white' }}></i>
                </div>
                <h5 className="card-title fw-bold mb-3">Operaciones CRUD</h5>
                <p className="card-text text-muted">
                  Crea, edita, visualiza y elimina libros en tiempo real.
                  Formularios con validaciones completas y mensajes claros.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="card border-0" style={{
              background: 'linear-gradient(135deg, #ECF0F1 0%, #BDC3C7 100%)',
              borderRadius: '15px'
            }}>
              <div className="card-body p-4">
                <h5 className="text-center mb-4 fw-bold" style={{ color: '#2C3E50' }}>
                  <i className="bi bi-stack me-2"></i>
                  Stack Tecnológico
                </h5>
                <div className="row text-center g-3">
                  <div className="col-6 col-md-3">
                    <div className="p-3">
                      <i className="bi bi-server" style={{ fontSize: '2.5rem', color: '#27AE60' }}></i>
                      <p className="mt-2 mb-0 fw-bold small">Node.js</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="p-3">
                      <i className="bi bi-broadcast" style={{ fontSize: '2.5rem', color: '#3498DB' }}></i>
                      <p className="mt-2 mb-0 fw-bold small">Express</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="p-3">
                      <i className="bi bi-database" style={{ fontSize: '2.5rem', color: '#27AE60' }}></i>
                      <p className="mt-2 mb-0 fw-bold small">MongoDB</p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="p-3">
                      <i className="bi bi-bootstrap-fill" style={{ fontSize: '2.5rem', color: '#7952B3' }}></i>
                      <p className="mt-2 mb-0 fw-bold small">React + Angular</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 text-center mb-5">
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="display-4 fw-bold" style={{ color: '#3498DB' }}>25+</h2>
              <p className="text-muted mb-0">Libros en Catálogo</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="display-4 fw-bold" style={{ color: '#27AE60' }}>20</h2>
              <p className="text-muted mb-0">Géneros Literarios</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="display-4 fw-bold" style={{ color: '#E74C3C' }}>6</h2>
              <p className="text-muted mb-0">Reglas de Negocio</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3">
              <h2 className="display-4 fw-bold" style={{ color: '#F39C12' }}>100%</h2>
              <p className="text-muted mb-0">CRUD Funcional</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


