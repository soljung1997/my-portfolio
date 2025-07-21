import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from '../controllers/project.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Public: Anyone can view projects
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin-only: manage projects
router.post('/', authCtrl.requireSignin, authCtrl.isAdmin, createProject);
router.put('/:id', authCtrl.requireSignin, authCtrl.isAdmin, updateProject);
router.delete('/:id', authCtrl.requireSignin, authCtrl.isAdmin, deleteProject);

export default router;
