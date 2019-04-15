const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.route('/brand')
    .get(categoryController.index)
// api
router.route('/api/brand')
    .get(categoryController.list)
    .post(categoryController.store)

router.route('/api/brand/:id')
    .get(categoryController.show)
    .patch(categoryController.update)
    // .delete(categoryController.destroy)
    .post(categoryController.destroy)

module.exports = router; 