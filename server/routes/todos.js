const { Router } = require('express');
const router  = Router();
const todo = require('../controllers/todoController');
const auth = require('../controllers/auth');

router.get('/', todo.getAll);

router.get('/:id/todo', auth.authUser, todo.getByUserId);

// create new task by user id
router.post('/:id/create', auth.authUser, todo.create)

// get task by id
router.get('/:id', todo.getTodoById)

// update task
router.put('/:id', auth.authUser, todo.updateTodoById)

// delete task
router.delete('/:id', auth.authUser, todo.deleteTodoById)



module.exports = router;