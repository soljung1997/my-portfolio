import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = (req, res) => {
  return res.json(req.profile); 
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(400).json({ error: 'Email may already be in use.' });
  }
};

export const updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

export const deleteAllUsers = async (req, res) => {
  await User.deleteMany({});
  res.json({ message: 'All users deleted' });
};

export const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve user' });
  }
};

// Internal use for /me route
export const getUserByIdInternal = async (id) => {
  try {
    return await User.findById(id).select('-hashed_password -salt'); // Hide sensitive fields
  } catch {
    return null;
  }
};
