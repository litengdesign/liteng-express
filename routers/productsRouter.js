const express = require('express')
const router = express.Router()
const productController = require('../controllers/productsController')

//跳转客户端
router.route('/productList').get(productController.index)
router.route('/product/:id').get(productController.show)
// api
router.route('/api/productsManage/list').get(productController.list); //列表
router.route('/api/productsManage/add').post(productController.store); //新增行
router.route('/api/productsManage/delete').post(productController.destroy); //删除行
router.route('/api/productsManage/update').post(productController.update); //更新行
module.exports = router; 