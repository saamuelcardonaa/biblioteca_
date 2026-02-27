// Componente de barra de navegación profesional

type NavbarProps = {
  isDarkMode: boolean
  onToggleTheme: () => void
}

export default function Navbar(_props: NavbarProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-lg" style={{
      background: 'linear-gradient(135deg, #2C3E50 0%, #1a252f 100%)'
    }}>
      <div className="container-fluid px-4">
        {/* Logo/Brand */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
          <i className="bi bi-book-fill me-2" style={{ fontSize: '1.5rem' }}></i>
          <span>Biblioteca MEAN</span>
        </a>

        {/* Botón toggle para móvil */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Items de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link px-3" href="/">
                <i className="bi bi-house-fill me-1"></i>
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="/libros">
                <i className="bi bi-journals me-1"></i>
                Catálogo
              </a>
            </li>

            {/* Separador vertical */}
            <li className="nav-item d-none d-lg-block mx-2">
              <div style={{
                width: '1px',
                height: '25px',
                background: 'rgba(255,255,255,0.3)'
              }}></div>
            </li>

            {/* Botón de tema - removido temporalmente para mantener estética consistente */}
            {/*
            <li className="nav-item">
              <button
                className="btn btn-sm btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                onClick={onToggleTheme}
                aria-label={`Cambiar a modo ${isDarkMode ? 'claro' : 'oscuro'}`}
                title={`Cambiar a modo ${isDarkMode ? 'claro' : 'oscuro'}`}
                style={{
                  width: '40px',
                  height: '40px',
                  transition: 'all 0.3s ease'
                }}
              >
                <i className={`bi ${isDarkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
              </button>
            </li>
            */}
          </ul>
        </div>
      </div>
    </nav>
  )
}
