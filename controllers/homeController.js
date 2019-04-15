//导入数据模型
const Post = require('../models/posts')
const Product = require('../models/products')
const Category = require('../models/category')
//获取所有品牌
const index = (request, response) => {
    let brands = []; //品牌列表
    let categorys = []; //分类列表
    let posts = []; //文章列表
    let productsTop = []; //推荐产品
    let productsHot = []; //热门产品
    Post.find()
        .then(documents => { 
            posts = documents 
    }) 
    Category.find().where('type', 'brand')
        .then(documents => {
            brands = documents
        })
    Category.find().where('type', 'product')
        .then(documents => {
            categorys = documents
    })
    Product.find().where('isTop', true).limit(5).then(documents => {
        productsHot = documents
    })
    Product.find().where('isTop', true).limit(12).then(documents => {
        //返回值给页面
        response.render('index', {
            data: {
                productsTop: documents,
                productsHot: productsHot,
                brands: brands,
                categorys: categorys,
                posts: posts
            }
        })
    })
}
module.exports = {
    index
}; 