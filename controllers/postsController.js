//导入数据模型
const Post = require('../models/posts')
const Product = require('../models/products')
const Category = require('../models/category')

//视图渲染
const index = (request,response) =>{
    Post.find().sort({ createTime: -1})
        .then(documents => response.render('posts', { data: documents }))  
}

//查询数据列表
const list = (request, response) => {
    Post.find().sort({ createTime: -1})
        .then(documents => response.send({
            total: documents.length,
            data: documents
        }))
}
//创建单个文档
const store = (request, response) => {
    const post = new Post({
        name: request.body.name,
        description: request.body.description,
        category: request.body.category,
        thumb: request.body.thumb,
        content: request.body.content,
        status: request.body.status,
        isTop: request.body.isTop,
        createTime: (new Date()).getTime()
    })
    post.save()
        .then(document => response.send(document))
}

const show = async (request, response) => {
    let brands = []; 
    let categorys = []; 
    let productsTop = []; 
    let productsHot = []; 
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
    var objectId = require('mongodb').ObjectId;
    var _id = objectId(request.params.id);
    var whereArgs = {
        _id: _id
    };
    Post.findOne(whereArgs).then(documents => {
        console.log("documents" + documents)
        //返回值给页面
        response.render('post', {
            data: {
                content: documents,
                productsHot: productsHot,
                productsTop: productsTop,
                brands: brands,
                categorys: categorys,

            }
        })
    })
}
//查找单个文档
const findById = (request, response) => {
    var objectId = require('mongodb').ObjectId;
    var _id = objectId(request.params.id);
    var whereArgs = {
        _id: _id
    };
    Post.findOne(whereArgs).then(documents => {
        response.send(documents)
    })
}
//更新文档根据id
const update = (request,response)=>{
    const id = request.params.id;
    const body = {
        name: request.body.name,
        description: request.body.description,
        category: request.body.category,
        thumb: request.body.thumb,
        content: request.body.content,
        status: request.body.status,
        isTop: request.body.isTop,
        createTime: (new Date()).getTime()
    }
    var objectId = require('mongodb').ObjectId;
    var _id = objectId(request.params.id);
    var whereArgs = {
        _id: _id
    };
    Post.update(whereArgs,{body}, {new:true})
        .then(document => response.send(document))
}

//删除文档
const destroy = (request,response)=>{
    const id = request.params.id;
    Post.findByIdAndRemove(id)
        .then(document => response.send(document))
}

module.exports = {
    list,
    index,
    store,
    show,
    update,
    destroy,
    findById
}; 
