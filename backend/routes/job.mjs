import express from 'express';
import { getAllJobs } from '../controllers/jobController.mjs';

const router = express.Router();

router.get('/jobs', getAllJobs); // /api/jobs?search=&location=&company=

export default router;
