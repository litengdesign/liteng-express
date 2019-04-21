// 公用方法
//产品分类
//精选品牌
const Post = require('../models/posts')
const Product = require('../models/products')
const Category = require('../models/category')
const getAllProduct = async (request, response)=>{
    //所有机型
    Product.find().where(status, true).then(documents => {
        return documents
    })
}
module.exports = {
    getAllProduct,

}; 
