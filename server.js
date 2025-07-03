// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './server/routes/auth.routes.js';
import connectDB from './server/db.js';


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

connectDB();

import contactRoutes from './server/routes/contacts.js';
import projectRoutes from './server/routes/projects.js';
import qualificationRoutes from './server/routes/qualifications.js';
import userRoutes from './server/routes/users.js';

// Route mounting
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);



// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Portfolio application.' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('Mongo Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected to:', mongoose.connection.name);
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});
