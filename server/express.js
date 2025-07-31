import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';
import authCtrl from './controllers/auth.controller.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

// ✅ CORS setup to allow Vercel frontend
app.use(cors({
  origin: 'https://my-portfolio-czuk-36iidnqam-solomons-projects-7c694625.vercel.app',
  credentials: true,
}));

app.use(helmet());

// Authenticated routes
app.use('/api/todos', authCtrl.requireSignin, todoRoutes);

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
    console.error('Error:', err);
  }
});

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

export default app;
