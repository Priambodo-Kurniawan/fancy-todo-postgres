const { Router } = require('express');
const router  = Router();
const auth = require('../controllers/auth');
const user = require('../controllers/userController');

router.post('/login', auth.login);

router.post('/signup', auth.signup)

router.delete('/:id_user', auth.authUser, user.remove)

router.put('/:id_user', auth.authUser, user.update)

router.get('/', user.findAll)
router.get('/:id_user', auth.authUser, user.getUserById)



module.exports = router;