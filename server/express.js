import express from 'express';
import cookieParser from 'cookie-parser'; // fixed typo: 'cookeParser'
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
app.use(cors());
app.use(helmet());
app.use('/api/todos', authCtrl.requireSignin, todoRoutes);

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
    console.error('Error:', err);
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));


export default app;
