//导入数据模型
const Product = require('../models/products')
const Category = require('../models/category')
let brands = []; //品牌列表
let categorys = []; //分类列表
let productsTop = []; //推荐产品
let productsHot = []; //热门产品

//获取推荐产品
async function getProductIsTop() {
    Product.find().where('status', true).limit(10).then(documents => {
        return documents
    })
}
//获取热门产品
async function getProductIsHot() {
    Product.find().where('status', true).limit(10).then(documents => {
        return documents
    })
}
//获取所有分类
async function getCategorys() {
    Category.find().where('type', 'product').limit(10).then(documents => {
        return documents
    })
}
//获取所有品牌
async function getBrands() {
    Category.find().where('type', 'brand').limit(10).then(documents => {
        return documents
    })
}
//产品列表视图
const index = async (request,response) =>{
    //获取参数
    let queryStr = '';
    if (request.query.brand){
        queryStr = { 'brand.id': request.query.brand }
    } else if (request.query.category){
        queryStr = { 'category.id': request.query.category }
    }
    let brands = []; //品牌列表
    let categorys = []; //分类列表
    let productsTop = []; //推荐产品
    let productsHot = []; //热门产品

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
    Product.find().where('isTop', true).limit(10).then(documents => {
        productsTop = documents
    })

    Product.find().where(queryStr).sort({ createTime:-1}).limit(12).then(documents => {
        //返回值给页面
        response.render('productList', {
            data: {
                products: documents,
                productsHot: productsHot,
                productsTop: productsTop,
                brands: brands,
                categorys: categorys,
            }
        })
    })
}

//查找文档根据id
const show = async (request, response) => {
    let brands = []; //品牌列表
    let categorys = []; //分类列表
    let productsTop = []; //推荐产品
    let productsHot = []; //热门产品
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
    Product.find().where('isTop', true).limit(10).then(documents => {
        productsTop = documents
    })
    const id = request.params.id;
    Product.findById(id).then(documents => {
        //返回值给页面
        response.render('product', {
            data: {
                productContent: documents,
                productsHot: productsHot,
                productsTop: productsTop,
                brands: brands,
                categorys: categorys,
            }
        })
    })
}
//查询数据列表
const list = (request, response) => {
    Product.find().sort({ createTime: -1 })
        .then(documents => response.send({
            total: documents.length,
            data: documents
        }))
}

//创建单个文档
const store = (request, response) => {
    const product = new Product({
        name: request.body.name,
        description: request.body.description,
        category: request.body.category,
        brand: request.body.brand,
        thumb: request.body.thumb,
        content: request.body.content,
        status: request.body.status,
        isTop: request.body.isTop,
        priceMonth: request.body.priceMonth,
        createTime: (new Date()).getTime()
    })
    product.save()
        .then(document => response.send(document))
}


//更新文档根据id
const update = (request,response)=>{
    const id = request.body.id;
    const body = {
        name: request.body.name,
        description: request.body.description,
        category: request.body.category,
        brand: request.body.brand,
        thumb: request.body.thumb,
        content: request.body.content,
        status: request.body.status,
        isTop: request.body.isTop,
        priceMonth: request.body.priceMonth,
        createTime: (new Date()).getTime()
    }
    Product.findByIdAndUpdate(id,{ $set: body }, {new:true})
        .then(document => response.send(document))
}

//删除文档
const destroy = (request,response)=>{
    const id = request.body.id;
    Product.findByIdAndRemove(id)
        .then(document => response.send(document))
}

module.exports = {
    index,
    list,
    store,
    show,
    update,
    destroy
}; 