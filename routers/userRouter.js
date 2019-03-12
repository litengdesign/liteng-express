const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticate  = require('../middlewares/authenticate')

router.route('/users')
  .post(userController.store)
  .get(userController.index)

router.post('/auth',userController.auth)

router.get('/logout', userController.logout)

router.get('/me', authenticate, userController.me)
module.exports = router; 