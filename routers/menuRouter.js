const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menuController')

// api
router.route('/api/menuManage/list').get(menuController.list); //列表
router.route('/api/menuManage/add').post(menuController.store); //新增

router.route('/api/menuManage/update').post(menuController.update);//更新
router.route('/api/menuManage/delete/:id').post(menuController.destroy); //删除

module.exports = router; 