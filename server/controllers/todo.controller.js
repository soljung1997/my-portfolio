import Todo from '../models/todo.model.js';

// Create a todo
export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.auth._id
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Could not add todo' });
  }
};

// Get all todos for the user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.auth._id });
    res.json(todos);
  } catch (err) {
    res.status(400).json({ error: 'Could not fetch todos' });
  }
};

// Get a specific todo
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.auth._id });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Could not fetch todo' });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.auth._id },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Could not update todo' });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.auth._id });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Could not delete todo' });
  }
};
