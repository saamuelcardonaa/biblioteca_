import dotenv from 'dotenv';

// Cargar variables de entorno PRIMERO
dotenv.config();

console.log('=== SERVIDOR INICIANDO ===');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);
console.log(`MONGODB_URI definida: ${!!process.env.MONGODB_URI}`);

import app from './src/app.js';
import { connectDB } from './src/config/database.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await connectDB();
    console.log('✅ Conexión a MongoDB exitosa');

    const server = app.listen(PORT, () => {
      console.log(`\n✅ Servidor corriendo en puerto ${PORT}`);
      console.log(`📍 http://localhost:${PORT}/api/v1\n`);
    });

    // Manejar errores del servidor
    server.on('error', (err) => {
      console.error('❌ Error en servidor:', err.message);
      if (err.code === 'EADDRINUSE') {
        console.error(`Puerto ${PORT} ya está en uso`);
      }
    });

  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Iniciar solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  console.log('🌍 Modo: DESARROLLO');
  startServer();
} else {
  console.log('🌐 Modo: PRODUCCIÓN (Vercel)');
}

// Exportar para Vercel
export default app;

