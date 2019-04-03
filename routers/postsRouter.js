const express = require('express')
const router = express.Router()
const postController = require('../controllers/postsController')

// api
router.route('/posts')
  .get(postController.index)
  .post(postController.store)

router.route('/posts/:id')
  .get(postController.show)
  .patch(postController.update)
  .delete(postController.destroy)

module.exports = router; 