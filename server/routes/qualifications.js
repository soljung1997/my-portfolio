import express from 'express';
import {
  createQualification,
  getQualifications,
  getQualificationById,
  updateQualification,
  deleteQualification
} from '../controllers/qualification.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Public: view qualifications
router.get('/', getQualifications);
router.get('/:id', getQualificationById);

// Admin-only
router.post('/', authCtrl.requireSignin, authCtrl.isAdmin, createQualification);
router.put('/:id', authCtrl.requireSignin, authCtrl.isAdmin, updateQualification);
router.delete('/:id', authCtrl.requireSignin, authCtrl.isAdmin, deleteQualification);

export default router;
