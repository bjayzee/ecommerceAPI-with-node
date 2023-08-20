const router = require('express').Router();

const userController = require('../controllers/usersController')



router.post('/registration', userController.userRegistration);



module.exports = router;