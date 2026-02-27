import mongoose from 'mongoose';

/**
 * Schema de Libro
 * Define la estructura y validaciones de cada documento en la colección 'libros'
 */
const libroSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: [true, 'El ISBN es requerido'],
      unique: true,
      trim: true,
      validate: {
        validator: function(isbn) {
          // Validar formato ISBN-10 o ISBN-13 (sin guiones)
          const isbnClean = isbn.replace(/-/g, '');
          return /^(?:\d{10}|\d{13})$/.test(isbnClean);
        },
        message: 'El ISBN debe tener 10 o 13 dígitos'
      }
    },
    titulo: {
      type: String,
      required: [true, 'El título es requerido'],
      trim: true,
      minlength: [2, 'El título debe tener al menos 2 caracteres'],
      maxlength: [200, 'El título no puede exceder 200 caracteres']
    },
    autor: {
      type: String,
      required: [true, 'El autor es requerido'],
      trim: true,
      minlength: [2, 'El nombre del autor debe tener al menos 2 caracteres']
    },
    editorial: {
      type: String,
      required: [true, 'La editorial es requerida'],
      trim: true
    },
    anioPublicacion: {
      type: Number,
      required: [true, 'El año de publicación es requerido'],
      min: [1000, 'El año debe ser mayor o igual a 1000'],
      max: [2026, 'El año no puede ser mayor a 2026']
    },
    generos: {
      type: [String],
      required: [true, 'Debe tener al menos un género'],
      validate: {
        validator: function(generos) {
          if (generos.length < 1 || generos.length > 3) {
            return false;
          }

          const generosValidos = [
            'ficción', 'no ficción', 'novela', 'ciencia ficción', 'fantasía',
            'thriller', 'misterio', 'romance', 'histórico', 'biografía',
            'autoayuda', 'tecnología', 'ciencia', 'poesía', 'drama',
            'terror', 'aventura', 'policial', 'filosofía', 'ensayo',
            'clásico', 'juvenil', 'educativo', 'psicología', 'programación',
            'divulgación', 'economía', 'cocina', 'recetas', 'infantil',
            'desarrollo personal'
          ];

          return generos.every(g => generosValidos.includes(g.toLowerCase()));
        },
        message: 'Debe tener entre 1 y 3 géneros válidos'
      }
    },
    numeroPaginas: {
      type: Number,
      required: [true, 'El número de páginas es requerido'],
      min: [1, 'Debe tener al menos 1 página'],
      max: [10000, 'El número de páginas no puede exceder 10000']
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      maxlength: [2000, 'La descripción no puede exceder 2000 caracteres'],
      trim: true
    },
    idioma: {
      type: String,
      required: [true, 'El idioma es requerido'],
      enum: ['español', 'inglés', 'francés', 'alemán', 'portugués', 'italiano', 'otro'],
      default: 'español'
    },
    precio: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio debe ser mayor o igual a 0'],
      max: [10000, 'El precio no puede exceder 10000']
    },
    stock: {
      type: Number,
      required: [true, 'El stock es requerido'],
      min: [0, 'El stock no puede ser negativo'],
      default: 1
    },
    disponible: {
      type: Boolean,
      default: true
    },
    portada: {
      type: String,
      default: null,
      validate: {
        validator: function(url) {
          // Permitir null, undefined o cadena vacía
          if (!url) return true;

          // Trimear y verificar si está vacío después del trim
          const trimmedUrl = url.trim();
          if (trimmedUrl === '') return true;

          // Validar que sea una URL válida que empiece con http:// o https://
          return /^https?:\/\/.+/.test(trimmedUrl);
        },
        message: 'La portada debe ser una URL válida que comience con http:// o https://'
      }
    }
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
    versionKey: false // Deshabilitar __v
  }
);

// Índices para mejorar rendimiento de búsquedas
libroSchema.index({ titulo: 1 });
libroSchema.index({ autor: 1 });
// No crear índice para isbn aquí, ya que unique: true lo crea automáticamente
libroSchema.index({ generos: 1 });
libroSchema.index({ disponible: 1 });

// Métoodo virtual para obtener título capitalizado
libroSchema.virtual('tituloCapitalizado').get(function() {
  return this.titulo
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
});

// Métoodo de instancia: Verificar disponibilidad
libroSchema.methods.verificarDisponibilidad = function() {
  this.disponible = this.stock > 0;
  return this.save();
};

// Métoodo de instancia: Prestar libro
libroSchema.methods.prestar = function() {
  if (this.stock > 0) {
    this.stock--;
    this.disponible = this.stock > 0;
    return this.save();
  }
  throw new Error('No hay ejemplares disponibles');
};

// Métoodo de instancia: Devolver libro
libroSchema.methods.devolver = function() {
  this.stock++;
  this.disponible = true;
  return this.save();
};

// Métoodo estático: Buscar por género
libroSchema.statics.buscarPorGenero = function(genero) {
  return this.find({ generos: genero.toLowerCase(), disponible: true });
};

// Métoodo estático: Buscar por autor
libroSchema.statics.buscarPorAutor = function(autor) {
  return this.find({ autor: new RegExp(autor, 'i'), disponible: true });
};

// Middleware pre-save: Normalizar géneros a minúsculas y actualizar disponibilidad
libroSchema.pre('save', function(next) {
  if (this.generos) {
    this.generos = this.generos.map(g => g.toLowerCase());
  }
  // Actualizar disponibilidad según stock
  this.disponible = this.stock > 0;
  next();
});

// Middleware pre-update: Normalizar géneros también en actualizaciones
libroSchema.pre('findOneAndUpdate', function(next) {
  try {
    const update = this.getUpdate();

    // Manejar diferentes estructuras de actualización ($set, directo, etc.)
    const updateData = update.$set || update;

    // Si se actualizan los géneros, normalizarlos a minúsculas
    if (updateData.generos && Array.isArray(updateData.generos)) {
      updateData.generos = updateData.generos.map(g =>
        typeof g === 'string' ? g.toLowerCase() : g
      );
    }

    // Si se actualiza el stock, actualizar disponibilidad
    if (updateData.stock !== undefined) {
      updateData.disponible = updateData.stock > 0;
    }

    next();
  } catch (error) {
    console.error('Error en middleware pre-update:', error);
    next(error);
  }
});

const Libro = mongoose.model('Libro', libroSchema);

export default Libro;

