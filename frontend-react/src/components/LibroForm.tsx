import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import libroService from '../services/libroService'
import type { LibroCreate } from '../services/libroService'

export default function LibroForm() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditMode = !!id

  // Estados del formulario
  const [formData, setFormData] = useState<LibroCreate>({
    isbn: '',
    titulo: '',
    autor: '',
    editorial: '',
    anioPublicacion: new Date().getFullYear(),
    generos: [],
    numeroPaginas: 1,
    descripcion: '',
    idioma: 'español',
    precio: 0,
    stock: 1,
    portada: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Géneros disponibles
  const generosDisponibles = [
    'ficción', 'no ficción', 'novela', 'ciencia ficción', 'fantasía',
    'thriller', 'misterio', 'romance', 'histórico', 'biografía',
    'autoayuda', 'tecnología', 'ciencia', 'poesía', 'drama',
    'terror', 'aventura', 'policial', 'filosofía', 'ensayo'
  ]

  const idiomasDisponibles = ['español', 'inglés', 'francés', 'alemán', 'portugués', 'italiano', 'otro']

  // Cargar libro si estamos en modo edición
  useEffect(() => {
    if (isEditMode && id) {
      loadLibro(id)
    }
  }, [id, isEditMode])

  async function loadLibro(libroId: string) {
    setLoadingData(true)
    try {
      const response = await libroService.getLibroById(libroId)
      const libro = response.data
      setFormData({
        isbn: libro.isbn,
        titulo: libro.titulo,
        autor: libro.autor,
        editorial: libro.editorial,
        anioPublicacion: libro.anioPublicacion,
        generos: libro.generos,
        numeroPaginas: libro.numeroPaginas,
        descripcion: libro.descripcion,
        idioma: libro.idioma,
        precio: libro.precio,
        stock: libro.stock,
        portada: libro.portada || ''
      })
    } catch (err: any) {
      setSubmitError(err?.message || 'Error al cargar el libro')
    } finally {
      setLoadingData(false)
    }
  }

  // Validar formulario
  function validateForm(): boolean {
    const newErrors: Record<string, string> = {}

    // ISBN
    const isbnClean = formData.isbn.replace(/-/g, '')
    if (!formData.isbn) {
      newErrors.isbn = 'El ISBN es requerido'
    } else if (!/^(\d{10}|\d{13})$/.test(isbnClean)) {
      newErrors.isbn = 'El ISBN debe tener 10 o 13 dígitos'
    }

    // Título
    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido'
    } else if (formData.titulo.length < 2) {
      newErrors.titulo = 'El título debe tener al menos 2 caracteres'
    }

    // Autor
    if (!formData.autor.trim()) {
      newErrors.autor = 'El autor es requerido'
    } else if (formData.autor.length < 2) {
      newErrors.autor = 'El autor debe tener al menos 2 caracteres'
    }

    // Editorial
    if (!formData.editorial.trim()) {
      newErrors.editorial = 'La editorial es requerida'
    }

    // Año
    if (formData.anioPublicacion < 1000 || formData.anioPublicacion > 2026) {
      newErrors.anioPublicacion = 'El año debe estar entre 1000 y 2026'
    }

    // Géneros
    if (formData.generos.length === 0) {
      newErrors.generos = 'Debe seleccionar al menos un género'
    } else if (formData.generos.length > 3) {
      newErrors.generos = 'Máximo 3 géneros permitidos'
    }

    // Páginas
    if (formData.numeroPaginas < 1 || formData.numeroPaginas > 10000) {
      newErrors.numeroPaginas = 'Las páginas deben estar entre 1 y 10000'
    }

    // Descripción
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida'
    } else if (formData.descripcion.length > 2000) {
      newErrors.descripcion = 'La descripción no puede exceder 2000 caracteres'
    }

    // Precio
    if (formData.precio < 0 || formData.precio > 10000) {
      newErrors.precio = 'El precio debe estar entre 0 y 10000'
    }

    // Stock
    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar cambios en inputs
  function handleChange(field: keyof LibroCreate, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Manejar selección de géneros
  function handleGeneroToggle(genero: string) {
    const currentGeneros = formData.generos
    if (currentGeneros.includes(genero)) {
      handleChange('generos', currentGeneros.filter((g) => g !== genero))
    } else {
      if (currentGeneros.length < 3) {
        handleChange('generos', [...currentGeneros, genero])
      }
    }
  }

  // Enviar formulario
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setSubmitError(null)

    try {
      // Preparar datos para enviar - eliminar portada si está vacía
      const dataToSend = { ...formData }
      if (!dataToSend.portada || dataToSend.portada.trim() === '') {
        delete dataToSend.portada
      }

      console.log('Datos a enviar:', dataToSend)

      if (isEditMode && id) {
        await libroService.updateLibro(id, dataToSend)
      } else {
        await libroService.createLibro(dataToSend)
      }
      navigate('/libros')
    } catch (err: any) {
      console.error('Error completo:', err)
      setSubmitError(err?.message || 'Error al guardar el libro')
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando datos del libro...</p>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                {isEditMode ? '✏️ Editar Libro' : '➕ Agregar Nuevo Libro'}
              </h3>
            </div>
            <div className="card-body">
              {submitError && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {submitError}
                  <button type="button" className="btn-close" onClick={() => setSubmitError(null)}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* ISBN */}
                <div className="mb-3">
                  <label className="form-label">ISBN *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
                    value={formData.isbn}
                    onChange={(e) => handleChange('isbn', e.target.value)}
                    placeholder="Ej: 9788408043640"
                  />
                  {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
                  <div className="form-text">ISBN-10 (10 dígitos) o ISBN-13 (13 dígitos)</div>
                </div>

                {/* Título */}
                <div className="mb-3">
                  <label className="form-label">Título *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                    value={formData.titulo}
                    onChange={(e) => handleChange('titulo', e.target.value)}
                    placeholder="Ej: Cien años de soledad"
                  />
                  {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                </div>

                {/* Autor */}
                <div className="mb-3">
                  <label className="form-label">Autor *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.autor ? 'is-invalid' : ''}`}
                    value={formData.autor}
                    onChange={(e) => handleChange('autor', e.target.value)}
                    placeholder="Ej: Gabriel García Márquez"
                  />
                  {errors.autor && <div className="invalid-feedback">{errors.autor}</div>}
                </div>

                {/* Editorial */}
                <div className="mb-3">
                  <label className="form-label">Editorial *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.editorial ? 'is-invalid' : ''}`}
                    value={formData.editorial}
                    onChange={(e) => handleChange('editorial', e.target.value)}
                    placeholder="Ej: Editorial Sudamericana"
                  />
                  {errors.editorial && <div className="invalid-feedback">{errors.editorial}</div>}
                </div>

                <div className="row">
                  {/* Año */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Año de Publicación *</label>
                    <input
                      type="number"
                      className={`form-control ${errors.anioPublicacion ? 'is-invalid' : ''}`}
                      value={formData.anioPublicacion}
                      onChange={(e) => handleChange('anioPublicacion', parseInt(e.target.value))}
                      min="1000"
                      max="2026"
                    />
                    {errors.anioPublicacion && <div className="invalid-feedback">{errors.anioPublicacion}</div>}
                  </div>

                  {/* Páginas */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Número de Páginas *</label>
                    <input
                      type="number"
                      className={`form-control ${errors.numeroPaginas ? 'is-invalid' : ''}`}
                      value={formData.numeroPaginas}
                      onChange={(e) => handleChange('numeroPaginas', parseInt(e.target.value))}
                      min="1"
                      max="10000"
                    />
                    {errors.numeroPaginas && <div className="invalid-feedback">{errors.numeroPaginas}</div>}
                  </div>

                  {/* Idioma */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Idioma *</label>
                    <select
                      className="form-select"
                      value={formData.idioma}
                      onChange={(e) => handleChange('idioma', e.target.value)}
                    >
                      {idiomasDisponibles.map((idioma) => (
                        <option key={idioma} value={idioma}>
                          {idioma.charAt(0).toUpperCase() + idioma.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Géneros */}
                <div className="mb-3">
                  <label className="form-label">Géneros * (Máximo 3)</label>
                  <div className="border rounded p-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <div className="row g-2">
                      {generosDisponibles.map((genero) => (
                        <div key={genero} className="col-md-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`genero-${genero}`}
                              checked={formData.generos.includes(genero)}
                              onChange={() => handleGeneroToggle(genero)}
                              disabled={!formData.generos.includes(genero) && formData.generos.length >= 3}
                            />
                            <label className="form-check-label" htmlFor={`genero-${genero}`}>
                              {genero.charAt(0).toUpperCase() + genero.slice(1)}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {errors.generos && <div className="text-danger small mt-1">{errors.generos}</div>}
                  <div className="form-text">
                    Seleccionados: {formData.generos.length}/3
                  </div>
                </div>

                {/* Descripción */}
                <div className="mb-3">
                  <label className="form-label">Descripción *</label>
                  <textarea
                    className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                    value={formData.descripcion}
                    onChange={(e) => handleChange('descripcion', e.target.value)}
                    rows={4}
                    placeholder="Escribe una breve descripción del libro..."
                    maxLength={2000}
                  />
                  {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
                  <div className="form-text">
                    {formData.descripcion.length}/2000 caracteres
                  </div>
                </div>

                <div className="row">
                  {/* Precio */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio (€) *</label>
                    <input
                      type="number"
                      step="0.01"
                      className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                      value={formData.precio}
                      onChange={(e) => handleChange('precio', parseFloat(e.target.value))}
                      min="0"
                      max="10000"
                    />
                    {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
                  </div>

                  {/* Stock */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Stock *</label>
                    <input
                      type="number"
                      className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                      value={formData.stock}
                      onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                      min="0"
                    />
                    {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                  </div>
                </div>

                {/* Portada */}
                <div className="mb-3">
                  <label className="form-label">URL de Portada (opcional)</label>
                  <input
                    type="url"
                    className="form-control"
                    value={formData.portada}
                    onChange={(e) => handleChange('portada', e.target.value)}
                    placeholder="https://ejemplo.com/portada.jpg"
                  />
                  <div className="form-text">Ingresa la URL de una imagen</div>
                </div>

                {/* Botones */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Guardando...
                      </>
                    ) : (
                      <>{isEditMode ? 'Guardar Cambios' : 'Crear Libro'}</>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/libros')}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

