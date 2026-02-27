import express from 'express';
import cors from 'cors';
import libroRoutes from './routes/libroRoutes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

const app = express();

// CORS - Configuración permisiva para Vercel
app.use(cors({
  origin: function(origin, callback) {
    console.log('[CORS] Origin recibido:', origin);
    callback(null, true); // Permitir todos los orígenes
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: false, // Cambia a false
  optionsSuccessStatus: 200
}));

// Manejo explícito de preflight
app.options('*', cors());


// Manejo explícito de preflight
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Biblioteca API - MEAN Stack Project',
    version: '1.0.0',
    documentationUrl: '/api/v1',
    endpoints: {
      documentation: 'GET /api/v1',
      getAllLibros: 'GET /api/v1/libros/get/all?page=1&limit=20',
      getLibroById: 'GET /api/v1/libros/get/:id',
      createLibro: 'POST /api/v1/libros/post',
      updateLibro: 'PATCH /api/v1/libros/update/:id',
      deleteLibro: 'DELETE /api/v1/libros/delete/:id',
    },
    author: 'Luis',
    description: 'API REST para gestión de biblioteca con operaciones CRUD completas',
  });
});

app.get('/api/v1', (req, res) => {
  res.json({
    success: true,
    message: 'Biblioteca API - MEAN Stack Project',
    version: '1.0.0',
    endpoints: {
      documentation: 'GET /api/v1',
      getAllLibros: 'GET /api/v1/libros/get/all?page=1&limit=20',
      getLibroById: 'GET /api/v1/libros/get/:id',
      createLibro: 'POST /api/v1/libros/post',
      updateLibro: 'PATCH /api/v1/libros/update/:id',
      deleteLibro: 'DELETE /api/v1/libros/delete/:id',
    },
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    db: 'checking',
    timestamp: new Date().toISOString()
  });
});

// Rutas de recursos
app.use('/api/v1/libros', libroRoutes);

// Middlewares de error (al final)
app.use(notFound);
app.use(errorHandler);

export default app;
