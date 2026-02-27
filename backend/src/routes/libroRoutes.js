import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from '../config/database.js';
import {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
} from '../controllers/libroController.js';

const router = express.Router();

// Middleware: Asegurar conexión a MongoDB
router.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('[Routes] Conectando a MongoDB...');
      await connectDB();
    }
    next();
  } catch (error) {
    console.error('[Routes] Error de conexión:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error de conexión a base de datos',
      error: error.message
    });
  }
});

// Rutas CRUD para libros
router.get('/get/all', getAllLibros);
router.get('/get/:id', getLibroById);
router.post('/post', createLibro);
router.patch('/update/:id', updateLibro);
router.delete('/delete/:id', deleteLibro);

export default router;

