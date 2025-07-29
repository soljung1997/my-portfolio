import 'dotenv/config';
import app from './express.js';
import connectDB from './db.js';

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();                 // <-- IMPORTANT
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
