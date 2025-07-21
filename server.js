// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './server/db.js';
import authRoutes from './server/routes/auth.routes.js';
import contactRoutes from './server/routes/contacts.js';
import projectRoutes from './server/routes/projects.js';
import qualificationRoutes from './server/routes/qualifications.js';
import userRoutes from './server/routes/user.routes.js';
import User from './server/models/user.model.js';
import todoRoutes from './server/routes/todo.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// -------------------- DATABASE CONNECTION --------------------
connectDB();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('Mongo Error:', err));

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected to:', mongoose.connection.name);
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});

// -------------------- ROUTES --------------------
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Portfolio application.' });
});

// -------------------- ADMIN SEEDER --------------------
const createAdminUser = async () => {
  try {
    const existing = await User.findOne({ email: 'admin@example.com' });
    if (!existing) {
      const admin = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'yourpassword',
        role: 'admin'  // ✅ make sure this line exists
      });
      await admin.save();
      console.log('✅ Admin user created');
    } else {
      console.log('⚠️ Admin already exists');
    }
  } catch (err) {
    console.error('❌ Admin creation failed:', err);
  }
};
createAdminUser();

// -------------------- SERVER START --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
