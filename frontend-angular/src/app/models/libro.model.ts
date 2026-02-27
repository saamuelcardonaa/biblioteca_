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
  portada?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  portada?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

