const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.route('/category')
    .get(categoryController.index)
// api
router.route('/api/categoryManage/list').get(categoryController.list); //列表
router.route('/api/categoryManage/add').post(categoryController.store); //新增

router.route('/api/categoryManage/findOne/:id').get(categoryController.show); //查询
router.route('/api/categoryManage/update').post(categoryController.update);//更新
router.route('/api/categoryManage/delete/:id').post(categoryController.destroy); //删除

module.exports = router; 