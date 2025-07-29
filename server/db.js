// server/db.js
import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is missing in .env');
    process.exit(1);
  }

  try {
    // Mongoose 8: no need for useNewUrlParser / useUnifiedTopology
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10s instead of hanging forever
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err);
  });
}
