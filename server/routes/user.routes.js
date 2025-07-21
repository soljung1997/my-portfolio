import express from 'express';
import * as userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Public: Signup route
router.post('/signup', userCtrl.createUser);
router.post('/login', authCtrl.signin); // <--- ADD THIS


// Admin-only: View or delete all users
router.get('/', authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.getUsers);
router.delete('/', authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.deleteAllUsers);

// Authenticated routes for individual users
router.get('/:userId', authCtrl.requireSignin, userCtrl.getUserById);
router.put('/:userId', authCtrl.requireSignin, userCtrl.updateUser);
router.delete('/:userId', authCtrl.requireSignin, userCtrl.deleteUser);

// Parameter extractor
router.param('userId', userCtrl.userByID);

export default router;
