import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// old ones (keep if still used elsewhere)
router.post('/signin', authCtrl.signin);
router.get('/signout', authCtrl.signout);

// the ones your React app is using
router.post('/api/signup', authCtrl.signup);          // Register
router.post('/api/users/login', authCtrl.signin);     // Login (alias)
// (optional) if you want to keep symmetry:
router.post('/api/users/signup', authCtrl.signup);

export default router;
