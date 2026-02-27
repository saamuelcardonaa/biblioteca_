import mongoose from 'mongoose';

/**
 * Conexión a MongoDB usando Mongoose
 */
export const connectDB = async () => {
  // Si ya está conectado, no hacer nada
  if (mongoose.connection.readyState === 1) {
    console.log('✅ MongoDB ya está conectado');
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI no está definida en variables de entorno');
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    console.log('🔄 Conectando a MongoDB...');

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📚 Base de datos: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error de conexión MongoDB: ${error.message}`);
    throw error;
  }
};

// Eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Error de Mongoose:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose desconectado de MongoDB');
});

