// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Tipos de datos
export interface Libro {
  _id: string;
  isbn: string;
  titulo: string;
  autor: string;
  editorial: string;
  anioPublicacion: number;
  generos: string[];
  numeroPaginas: number;
  descripcion: string;
  idioma: string;
  precio: number;
  stock: number;
  disponible: boolean;
  portada: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LibroCreate {
  isbn: string;
  titulo: string;
  autor: string;
  editorial: string;
  anioPublicacion: number;
  generos: string[];
  numeroPaginas: number;
  descripcion: string;
  idioma: string;
  precio: number;
  stock: number;
  disponible?: boolean;
  portada?: string;
}

export interface PaginationResponse {
  success: boolean;
  data: Libro[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface SingleResponse {
  success: boolean;
  data: Libro;
  message?: string;
}

// Clase para manejar peticiones HTTP a la API
class LibroService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/libros`;
  }

  /**
   * Obtener todos los libros con paginación y filtros
   */
  async getAllLibros(
    page: number = 1,
    limit: number = 20,
    genero?: string,
    disponible?: boolean,
    search?: string,
    autor?: string
  ): Promise<PaginationResponse> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      if (genero) params.append('genero', genero);
      if (disponible !== undefined) params.append('disponible', disponible.toString());
      if (search) params.append('search', search);
      if (autor) params.append('autor', autor);

      const response = await fetch(`${this.baseUrl}/get/all?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener libros:', error);
      throw error;
    }
  }

  /**
   * Obtener un libro por ID
   */
  async getLibroById(id: string): Promise<SingleResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/get/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener libro:', error);
      throw error;
    }
  }

  /**
   * Crear un nuevo libro
   */
  async createLibro(libro: LibroCreate): Promise<SingleResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(libro),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Si hay errores de validación específicos, mostrarlos
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors.map((err: any) =>
            `${err.field}: ${err.message} (valor: ${err.value})`
          ).join('\n');
          throw new Error(`${errorData.message}\n${errorMessages}`);
        }

        // Si hay detalles adicionales, incluirlos
        if (errorData.details) {
          throw new Error(`${errorData.message}\nDetalles: ${errorData.details}`);
        }

        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear libro:', error);
      throw error;
    }
  }

  /**
   * Actualizar un libro existente
   */
  async updateLibro(id: string, libro: Partial<LibroCreate>): Promise<SingleResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(libro),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Si hay errores de validación específicos, mostrarlos
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors.map((err: any) =>
            `${err.field}: ${err.message} (valor: ${err.value})`
          ).join('\n');
          throw new Error(`${errorData.message}\n${errorMessages}`);
        }

        // Si hay detalles adicionales, incluirlos
        if (errorData.details) {
          throw new Error(`${errorData.message}\nDetalles: ${errorData.details}`);
        }

        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      throw error;
    }
  }

  /**
   * Eliminar un libro
   */
  async deleteLibro(id: string): Promise<SingleResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      throw error;
    }
  }
}

// Exportar una instancia del servicio
export const libroService = new LibroService();
export default libroService;

