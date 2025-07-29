import express from 'express';
import * as userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// ───────────────────────────────────────────────
// 🔓 Public Routes
router.post('/signup', userCtrl.createUser);
router.post('/login', authCtrl.signin);

// ───────────────────────────────────────────────
// 🔒 Authenticated route to get current user's profile
router.get('/me', authCtrl.requireSignin, async (req, res) => {
  try {
    const user = await userCtrl.getUserByIdInternal(req.auth._id); // Internal function
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// ───────────────────────────────────────────────
// 🔐 Admin-only Routes
router.get('/', authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.getUsers);
router.delete('/', authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.deleteAllUsers);

// ───────────────────────────────────────────────
// 🔒 Authenticated Routes for individual users
router.get('/:userId', authCtrl.requireSignin, userCtrl.getUserById);
router.put('/:userId', authCtrl.requireSignin, userCtrl.updateUser);
router.delete('/:userId', authCtrl.requireSignin, userCtrl.deleteUser);

// ───────────────────────────────────────────────
// 🧩 Route Parameter Middleware
router.param('userId', userCtrl.userByID);

export default router;
