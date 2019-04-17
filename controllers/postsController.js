//导入数据模型
const Post = require('../models/posts')

//视图渲染
const index = (request,response) =>{
    Post.find()
        .then(documents => response.render('posts', { data: documents }))  
}

//查询数据列表
const list = (request, response) => {
    Post.find()
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
        createTime: new Date()
    })
    post.save()
        .then(document => response.send(document))
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
    Post.findById(id).then(documents => {
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
        createTime: new Date()
    }
    console.log(body.title)
    Post.findByIdAndUpdate(id,{ $set: body }, {new:true})
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
    destroy
}; 