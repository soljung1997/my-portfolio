import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import * as todoCtrl from '../controllers/todo.controller.js';

const router = express.Router();

// Protect all routes with signin
router.use(authCtrl.requireSignin);

router.post('/', todoCtrl.createTodo);               // POST /api/todos
router.get('/', todoCtrl.getTodos);                  // GET /api/todos
router.get('/:id', todoCtrl.getTodoById);            // GET /api/todos/:id
router.put('/:id', todoCtrl.updateTodo);             // PUT /api/todos/:id
router.delete('/:id', todoCtrl.deleteTodo);          // DELETE /api/todos/:id

export default router;
