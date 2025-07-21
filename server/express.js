import express from 'express';
import bodyParser from 'body-parser;'
import cookeParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookeParser());
app.use(compress());
app.use(cors());
app.use(helmet());

app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({error: err.name + ': ' + err.message});
    console.log('Error:', err);
  }
});

export default app;