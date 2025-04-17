import dotenv from 'dotenv';
import app from './app.mjs';
import connectDB from './config/db.mjs';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
