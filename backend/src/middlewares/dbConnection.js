import mongoose from 'mongoose';
import { connectDB } from '../config/database.js';

/**
 * Middleware para asegurar que MongoDB está conectado antes de cada request
 */
export const ensureDBConnection = async (req, res, next) => {
  try {
    // Verificar si mongoose está conectado
    if (mongoose.connection.readyState !== 1) {
      // No está conectado, intentar conectar
      await connectDB();
    }
    next();
  } catch (error) {
    console.error('Error en ensureDBConnection:', error.message);
    // No detener la request, solo logear el error
    // Los endpoints de documentación pueden funcionar sin BD
    next();
  }
};

export default ensureDBConnection;

