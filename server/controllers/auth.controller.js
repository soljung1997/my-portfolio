import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ error: 'User not found' });

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: 'Email and password do not match' });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwtSecret
    );
    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(401).json({ error: 'Signin failed' });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: 'Signout success' });
};

// ✅ Custom JWT middleware
const requireSignin = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = bearerToken.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.auth = decoded; // { _id: ..., role: ... }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({ error: 'User is not authorized' });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.auth.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  isAdmin
};
