//导入数据模型
const Post = require('../models/posts')
const Product = require('../models/products')
const Category = require('../models/category')
const Menu = require('../models/menu');

let menus = []; //导航菜单
let brands = []; //品牌列表
let categorys = []; //分类列表
let posts = []; //文章列表
let productsTop = []; //推荐产品
let productsHot = []; //热门产品
let abouts = []; //关于我们
let solutions = []; //解决方案
let news = []; //新闻动态

//视图渲染
const index = async (request, response) => {
    menus = await Menu.find().sort({ serial: 1 });
    posts = await Post.find().where('category.label', request.query.category).sort({ createTime: -1 });
    brands = await Category.find().where('type', 'brand');
    categorys = await Category.find().where('type', 'product');
    productsHot = await Product.find().where('isTop', true).limit(5);
    productsTop = await Product.find().where('isTop', true).sort({ createTime: -1 }).limit(6);
    abouts = await Post.find().where('category.label', '关于我们').limit(4);
    //返回值给页面
    response.render('postList', {
        data: {
            menus: menus,
            categoryName: request.query.category,
            posts: posts,
            productsHot: productsHot,
            productsTop: productsTop,
            brands: brands,
            categorys: categorys,
            abouts: abouts,
        }
    })
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
        updateDate: (new Date()).getTime(),
        createTime: (new Date()).getTime(),
        createTimeStr: (new Date()).getFullYear() + '-' + (parseInt(new Date().getMonth()) + 1) + '-' + (new Date()).getDay()
    })
    post.save()
        .then(document => response.send(
            {
                status: 1,
                message: '新增成功！'
            }
        ))
}

const show = async (request, response) => {
    let brands = []; 
    let categorys = []; 
    let productsTop = []; 
    let productsHot = []; 
    var objectId = require('mongodb').ObjectId;
    var _id = objectId(request.params.id);
    var whereArgs = {
        _id: _id
    };
   menus = await Menu.find().sort({ serial: 1 });
    brands = await Category.find().where('type', 'brand');
    categorys = await Category.find().where('type', 'product');
    productsHot = await Product.find().where('isTop', true).limit(5);
    productsTop = await Product.find().where('isTop', true).sort({ createTime: -1 }).limit(6);
    abouts = await Post.find().where('category.label', '关于我们').limit(4);
    solutions = await Post.find().where('category.label', '解决方案').sort({ createTime: -1 }).limit(5);
    news = await Post.find().where('category.label', '新闻中心').sort({ createTime: -1 }).limit(5);
    const content = await Post.findOne(whereArgs);
    //返回值给页面
    response.render('post', {
        data: {
            menus: menus,
            content: content,
            productsHot: productsHot,
            productsTop: productsTop,
            brands: brands,
            categorys: categorys,
            abouts: abouts,
            solutions: solutions,
            news: news,
        }
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
//按照别处
const findByName = (request, response) => {
    var name = require('mongodb').name;
    var whereArgs = {
        name: name
    };
    Post.findOne(whereArgs).then(documents => {
        response.send(documents)
    })
}
//更新文档根据id
const update = (request, response) => {
    const id = request.body.id;
    const body = {
        name: request.body.name,
        description: request.body.description || '',
        category: request.body.category,
        thumb: request.body.thumb,
        content: request.body.content,
        status: request.body.status || false,
        isTop: request.body.isTop || false,
        updateDate: (new Date()).getTime(),
    }
    Post.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(document => response.send(
            {
            status:1,
            message:'更新成功！'
            }
        ))
}

//删除文档
const destroy = (request, response) => {
    const id = request.body.id;
    Post.findByIdAndRemove(id)
        .then(document => response.send(
            {
                status: 1,
                message: '删除成功！'
            }
        ))
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
