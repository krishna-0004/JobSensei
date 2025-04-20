import express from 'express';
import { getAllJobs, getAllBusinessDetails, applyToJob } from '../controllers/jobController.mjs';

const router = express.Router();

router.get('/jobs', getAllJobs);
router.get('/business-details', getAllBusinessDetails);
router.post('/apply', applyToJob);

export default router;
