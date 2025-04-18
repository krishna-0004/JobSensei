import express from 'express';
import { authenticateJWT, verifyJWT } from '../middleware/jwt.mjs';
import {
  updateCommonInfo,
  selectRole,
  submitRecruiterDetails,
  submitMentorDetails,
  approveUser,
  getPendingUsers,
  getUserById,
  uploadAvatar
} from '../controllers/userController.mjs';
import upload from '../middleware/upload.mjs';

const router = express.Router();

router.put('/common-info', authenticateJWT, updateCommonInfo);
router.put('/select-role', authenticateJWT, selectRole);
router.put('/recruiter-form', authenticateJWT, submitRecruiterDetails);
router.put('/mentor-form', authenticateJWT, submitMentorDetails);
router.put('/admin/approve/:userId', authenticateJWT, approveUser);
router.get('/admin/pending', authenticateJWT, getPendingUsers);
router.get('/:id',getUserById);
router.put('/upload-avatar', authenticateJWT, upload.single('avatar'), uploadAvatar);


export default router;
