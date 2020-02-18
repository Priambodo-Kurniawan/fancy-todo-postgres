const { Router } = require('express');
const router  = Router();
const todo = require('../controllers/todoController')

router.get('/', todo.getAll);

router.get('/todo', todo.getByUserId);

// create new task
router.post('/create', todo.create)

// get task by id
router.get('/:id', todo.getTodoById)

// update task
router.put('/:id', todo.updateTodoById)

// delete task
router.delete('/:id', todo.deleteTodoById)



module.exports = router;