import express from 'express';
import { authenticateJWT } from '../middleware/jwt.mjs';
import {
  updateCommonInfo,
  selectRole,
  submitRecruiterDetails,
  submitMentorDetails,
  approveUser,
  getPendingUsers,
  getUserById
} from '../controllers/userController.mjs';

const router = express.Router();

router.put('/common-info', authenticateJWT, updateCommonInfo);
router.put('/select-role', authenticateJWT, selectRole);
router.put('/recruiter-form', authenticateJWT, submitRecruiterDetails);
router.put('/mentor-form', authenticateJWT, submitMentorDetails);
router.put('/admin/approve/:userId', authenticateJWT, approveUser);
router.get('/admin/pending', authenticateJWT, getPendingUsers);
router.get('/:id',getUserById);

export default router;
