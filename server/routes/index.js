const { Router } = require('express');
const router  = Router();
const todoRouter = require('./routes/todos');
const userRouter = require('./routes/users');

router.use('/api/todos', todoRouter);
router.use('/api/todos', userRouter);
router.get('/', (req, res) => res.send('Welcome'));

module.exports = router;