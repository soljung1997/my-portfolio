import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

const formatMongoError = (err) => {
  // Duplicate email
  if (err.code === 11000) {
    return 'Email already exists';
  }
  // Validation errors
  if (err.name === 'ValidationError') {
    const first = Object.values(err.errors)[0];
    return first?.message || 'Validation error';
  }
  return err.message || 'Something went wrong';
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // quick manual check
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // This WILL trigger your virtual setter and create hashed_password + salt
    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(400).json({ error: formatMongoError(err) });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'User not found' });

    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Email and password do not match' });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(401).json({ error: 'Signin failed' });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({ message: 'Signout success' });
};

const requireSignin = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  const token = bearerToken.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.auth = decoded;
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
  signup,
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  isAdmin
};
