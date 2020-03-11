const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticate  = require('../middlewares/authenticate')

router.route('/api/users')
  .post(userController.store)
  .get(userController.index)

router.post('/api/auth',userController.auth)

router.get('/api/logout', userController.logout)

router.get('/api/me', userController.me)
module.exports = router; 