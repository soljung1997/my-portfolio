import express from 'express';
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} from '../controllers/contactController.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Public: Anyone can submit a contact form
router.post('/', createContact);

// Admin-only access for full contact management
router.get('/', authCtrl.requireSignin, authCtrl.isAdmin, getContacts);
router.get('/:id', authCtrl.requireSignin, authCtrl.isAdmin, getContactById);
router.put('/:id', authCtrl.requireSignin, authCtrl.isAdmin, updateContact);
router.delete('/:id', authCtrl.requireSignin, authCtrl.isAdmin, deleteContact);
router.delete('/', authCtrl.requireSignin, authCtrl.isAdmin, deleteAllContacts);

export default router;
