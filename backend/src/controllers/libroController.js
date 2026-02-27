import Libro from '../models/Libro.js';

export const getAllLibros = async (req, res) => {
  try {
    // Obtener parámetros de query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const genero = req.query.genero;
    const disponible = req.query.disponible;
    const search = req.query.search;
    const autor = req.query.autor;

    // Calcular skip para paginación
    const skip = (page - 1) * limit;

    // Construir filtros
    const filters = {};

    if (genero) {
      filters.generos = genero.toLowerCase();
    }

    if (disponible !== undefined) {
      filters.disponible = disponible === 'true';
    }

    if (search) {
      filters.titulo = { $regex: search, $options: 'i' }; // Búsqueda insensible a mayúsculas
    }

    if (autor) {
      filters.autor = { $regex: autor, $options: 'i' };
    }

    // Obtener libros con filtros y paginación
    const libros = await Libro.find(filters)
      .sort({ createdAt: -1, _id: -1 }) // Ordenar por más recientes y luego por ID para consistencia
      .skip(skip)
      .limit(limit);

    // Contar total de documentos que cumplen los filtros
    const totalItems = await Libro.countDocuments(filters);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      success: true,
      data: libros,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener libros',
      error: error.message,
    });
  }
};

export const getLibroById = async (req, res) => {
  try {
    const { id } = req.params;

    const libro = await Libro.findById(id);

    if (!libro) {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: libro,
    });
  } catch (error) {
    // Error de formato de ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'ID de libro inválido',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al obtener libro',
      error: error.message,
    });
  }
};


export const createLibro = async (req, res) => {
  try {
    const {
      isbn,
      titulo,
      autor,
      editorial,
      anioPublicacion,
      generos,
      numeroPaginas,
      descripcion,
      idioma,
      precio,
      stock,
      disponible,
      portada
    } = req.body;

    // Validar campos requeridos
    if (!isbn || !titulo || !autor || !editorial || !anioPublicacion || !generos || !numeroPaginas || !descripcion || !precio) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos requeridos deben ser proporcionados',
      });
    }

    // Verificar si ya existe un libro con ese ISBN
    const libroExistente = await Libro.findOne({ isbn });

    if (libroExistente) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un libro con ese ISBN',
      });
    }

    // Crear nuevo libro
    const libro = await Libro.create({
      isbn,
      titulo,
      autor,
      editorial,
      anioPublicacion,
      generos,
      numeroPaginas,
      descripcion,
      idioma,
      precio,
      stock,
      disponible,
      portada,
    });

    res.status(201).json({
      success: true,
      message: 'Libro creado exitosamente',
      data: libro,
    });
  } catch (error) {
    console.error('========================================');
    console.error('Error en createLibro:');
    console.error('Error completo:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error errors:', error.errors);
    console.error('Error keys:', error.errors ? Object.keys(error.errors) : 'N/A');
    console.error('========================================');

    // Errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const messages = [];

      // Verificar si error.errors existe
      if (error.errors) {
        // Iterar sobre los errores
        for (const field in error.errors) {
          const err = error.errors[field];

          if (err) {
            messages.push({
              field: field,
              message: err.message || err.toString(),
              value: err.value !== undefined ? err.value : (err.properties?.value || req.body[field])
            });
          }
        }
      }

      // Si no hay mensajes específicos, usar el mensaje general
      if (messages.length === 0) {
        messages.push({
          field: 'general',
          message: error.message,
          value: null
        });
      }

      console.error('Errores formateados:', JSON.stringify(messages, null, 2));

      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: messages,
        details: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear libro',
      error: error.message,
    });
  }
};

export const updateLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    console.log('=== UPDATE LIBRO ===');
    console.log('ID:', id);
    console.log('Update Data:', JSON.stringify(updateData, null, 2));

    // Verificar que no se actualice a un ISBN duplicado
    if (updateData.isbn) {
      const libroExistente = await Libro.findOne({
        isbn: updateData.isbn,
        _id: { $ne: id }, // Excluir el libro actual
      });

      if (libroExistente) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un libro con ese ISBN',
        });
      }
    }

    const libro = await Libro.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Retornar el documento actualizado
        runValidators: true, // Ejecutar validaciones del schema
      }
    );

    if (!libro) {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado',
      });
    }

    console.log('Libro actualizado correctamente');

    res.status(200).json({
      success: true,
      message: 'Libro actualizado exitosamente',
      data: libro,
    });
  } catch (error) {
    console.error('========================================');
    console.error('Error en updateLibro:');
    console.error('Error completo:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error errors:', error.errors);
    console.error('Error keys:', error.errors ? Object.keys(error.errors) : 'N/A');
    console.error('========================================');

    if (error.name === 'ValidationError') {
      const messages = [];

      // Verificar si error.errors existe
      if (error.errors) {
        // Iterar sobre los errores
        for (const field in error.errors) {
          const err = error.errors[field];

          if (err) {
            messages.push({
              field: field,
              message: err.message || err.toString(),
              value: err.value !== undefined ? err.value : (err.properties?.value || updateData[field])
            });
          }
        }
      }

      // Si no hay mensajes específicos, usar el mensaje general
      if (messages.length === 0) {
        messages.push({
          field: 'general',
          message: error.message,
          value: null
        });
      }

      console.error('Errores formateados:', JSON.stringify(messages, null, 2));

      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: messages,
        details: error.message
      });
    }

    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'ID de libro inválido',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar libro',
      error: error.message,
    });
  }
};

export const deleteLibro = async (req, res) => {
  try {
    const { id } = req.params;

    const libro = await Libro.findByIdAndDelete(id);

    if (!libro) {
      return res.status(404).json({
        success: false,
        message: 'Libro no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Libro eliminado exitosamente',
      data: libro,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'ID de libro inválido',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al eliminar libro',
      error: error.message,
    });
  }
};

