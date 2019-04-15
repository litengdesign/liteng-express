const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController')

//跳转客户端
router.route('/postList').get(postsController.index)
router.route('/post/:id').get(postsController.show)
// api
router.route('/api/postsManage/list').get(postsController.list); //列表
router.route('/api/postsManage/add').post(postsController.store); //新增行
// router.route('/api/postsManage/findOne/:id').get(postsController.show); //根据id查找
router.route('/api/postsManage/delete').post(postsController.destroy); //删除行
router.route('/api/postsManage/update').post(postsController.update); //更新行
module.exports = router; 


