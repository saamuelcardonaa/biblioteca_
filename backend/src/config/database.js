import mongoose from 'mongoose';

// Cache global para entornos serverless (Vercel)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Conexión a MongoDB usando Mongoose (serverless-friendly)
 */
export const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI no está definida en variables de entorno');
    throw new Error('MONGODB_URI is not defined');
  }

  if (!cached.promise) {
    console.log('🔄 Conectando a MongoDB...');

    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    }).then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
    console.log(`✅ MongoDB conectado: ${cached.conn.connection.host}`);
    console.log(`📚 Base de datos: ${cached.conn.connection.name}`);
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error(`❌ Error de conexión MongoDB: ${error.message}`);
    throw error;
  }
};

