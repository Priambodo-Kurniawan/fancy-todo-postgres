const { Router } = require('express');
const router  = Router();
const todoRouter = require('./todos');
const userRouter = require('./users');

router.use('/api/todos', todoRouter);
router.use('/api/users', userRouter);
router.get('/', (req, res) => res.send('Welcome'));

module.exports = router;