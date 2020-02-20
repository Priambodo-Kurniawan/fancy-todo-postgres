const { Router } = require('express');
const router  = Router();
const todo = require('../controllers/todoController');
const auth = require('../controllers/auth');

router.get('/', todo.getAll);

// create new task by user id
router.post('/:id_user/create', auth.authUser, todo.create)

// get task by id
router.get('/:id_todo', auth.authUser, todo.getTodoById)

// update task
router.put('/:id_todo', auth.authUser, todo.updateTodoById)

// delete task
router.delete('/:id_todo', auth.authUser, todo.deleteTodoById)



module.exports = router;