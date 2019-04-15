const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')

// api
router.route('/')
    .get(homeController.index)

module.exports = router; 