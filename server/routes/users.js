const { Router } = require('express');
const router  = Router();
const auth = require('../controllers/auth');
const user = require('../controllers/userController');
const { authentication } = require('../middlewares/authentication');

router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.get('/', user.findAll);

router.use(authentication);
router.delete('/:id_user', user.remove);
router.put('/:id_user', user.update);
router.get('/:id_user', user.getUserById);



module.exports = router;