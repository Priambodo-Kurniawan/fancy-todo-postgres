const { Router } = require('express');
const router  = Router();
const auth = require('../controllers/auth');
const user = require('../controllers/userController');

router.post('/login', auth.login);

router.post('/signup', auth.signup)

router.delete('/:id', auth.authUser, user.remove)

router.put('/:id', auth.authUser, user.update)

router.get('/', user.findAll)
router.get('/:id', auth.authUser, user.getUserById)



module.exports = router;