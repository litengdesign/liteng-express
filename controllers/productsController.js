//导入数据模型
const Product = require('../models/products');
const Category = require('../models/category');
const Post = require('../models/posts');
const Menu = require('../models/menu');

let menus = []; //导航菜单
let brands = []; //品牌列表
let categorys = []; //分类列表
let productsTop = []; //推荐产品
let productsHot = []; //热门产品
let products = []; //产品列表
let abouts = []; //关于我们
let solutions = []; //解决方案
let news = []; //新闻动态

//产品列表视图
const index = async (request,response) =>{
    //获取参数
    let queryStr = '';
    if (request.query.brand){
        queryStr = { 'brand.id': request.query.brand }
    } else if (request.query.category){
        queryStr = { 'category.id': request.query.category }
    }
    menus = await Menu.find().sort({ serial: 1 });
    brands = await Category.find().where('type', 'brand');
    categorys = await Category.find().where('type', 'product');
    productsHot = await Product.find().where('isTop', true).limit(5);
    productsTop = await Product.find().where('isTop', true).sort({ createTime: -1 }).limit(6);
    products = await Product.find().where(queryStr).sort({ createTime: -1 });
    abouts = await Post.find().where('category.label', '关于我们').limit(4);
    //返回值给页面
    response.render('productList', {
        data: {
            menus: menus,
            products: products,
            productsHot: productsHot,
            productsTop: productsTop,
            brands: brands,
            categorys: categorys,
            abouts: abouts
        }
    })
}

//查找文档根据id
const show = async (request, response) => {
    const id = request.params.id;
    menus = await Menu.find().sort({ serial: 1 });
    const productContent = await  Product.findById(id);
    brands = await Category.find().where('type', 'brand');
    categorys = await Category.find().where('type', 'product');
    productsHot = await Product.find().where('isTop', true).limit(5);
    productsTop = await Product.find().where('isTop', true).sort({ createTime: -1 }).limit(6);
    abouts = await Post.find().where('category.label', '关于我们').limit(4);
    solutions = await Post.find().where('category.label', '解决方案').limit(5);
    news = await Post.find().where('category.label', '新闻中心').limit(5);
    //返回值给页面
    response.render('product', {
        data: {
            menus: menus,
            productContent: productContent,
            productsTop: productsTop,
            productsHot: productsHot,
            brands: brands,
            categorys: categorys,
            abouts: abouts,
            solutions: solutions,
            news: news,
        }
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
        status: request.body.status || false,
        isTop: request.body.isTop || false,
        priceMonth: request.body.priceMonth,
        code: request.body.code,
        minShopping: request.body.minShopping,
        useShopping: request.body.useShopping,
        contract: request.body.contract,
        createTime: (new Date()).getTime()
    })
    product.save()
        .then(document => response.send(
            {
                status: 1,
                message: '新增成功！'
            }
        ))
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
        status: request.body.status || false,
        isTop: request.body.isTop || false,
        priceMonth: request.body.priceMonth,
        code: request.body.code,
        minShopping: request.body.minShopping,
        useShopping: request.body.useShopping,
        contract: request.body.contract,
    }
    Product.findByIdAndUpdate(id,{ $set: body }, {new:true})
        .then(document => response.send(
            {
                status: 1,
                message: '更新成功！'
            }
        ))
}

//删除文档
const destroy = (request,response)=>{
    const id = request.body.id;
    Product.findByIdAndRemove(id)
        .then(document => response.send(
            {
                status: 1,
                message: '删除成功！'
            }
        ))
}

module.exports = {
    index,
    list,
    store,
    show,
    update,
    destroy
}; 