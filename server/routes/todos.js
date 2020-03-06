const { Router } = require('express');
const router  = Router();
const todo = require('../controllers/todoController');
const { authentication } = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');

router.get('/', todo.getAll);


router.use(authentication);

// create new task by user id
router.post('/create', todo.create)

// get task by id
router.get('/:id_todo', authorization, todo.getTodoById)

// update task
router.put('/:id_todo', authorization, todo.updateTodoById)

// delete task
router.delete('/:id_todo', authorization, todo.deleteTodoById)



module.exports = router;