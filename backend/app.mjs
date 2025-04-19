import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';

import './config/passport.mjs';
import authRoutes from './routes/auth.mjs';
import userRoutes from './routes/user.mjs';
import jobRoutes from "./routes/job.mjs";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend dev server
    credentials: true,
  })
);
app.use(express.json());

app.use(session({ secret: 'secretcode', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/api', jobRoutes);

mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

export default app;
