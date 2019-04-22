//导入数据模型
const Product = require('../models/products')
const Category = require('../models/category')

let brands = []; //品牌列表
let categorys = []; //分类列表
let productsTop = []; //推荐产品
let productsHot = []; //热门产品
let products = []; //产品列表

//产品列表视图
const index = async (request,response) =>{
    //获取参数
    let queryStr = '';
    if (request.query.brand){
        queryStr = { 'brand.id': request.query.brand }
    } else if (request.query.category){
        queryStr = { 'category.id': request.query.category }
    }
    brands = await Category.find().where('type', 'brand');
    categorys = await Category.find().where('type', 'product');
    productsHot = await Product.find().where('isTop', true).limit(5);
    productsTop = await Product.find().where('isTop', true).sort({ createTime: -1 }).limit(6);
    products = await Product.find().where(queryStr).sort({ createTime: -1 });
    console.log("products" + products)
    //返回值给页面
    response.render('productList', {
        data: {
            products: products,
            productsHot: productsHot,
            productsTop: productsTop,
            brands: brands,
            categorys: categorys,
        }
    })
}

//查找文档根据id
const show = async (request, response) => {
    const id = request.params.id;
    const productContent = await  Product.findById(id);
    brands = await Category.find().where('type', 'brand');
    categorys = await Category.find().where('type', 'product');
    productsHot = await Product.find().where('isTop', true).limit(5);
    productsTop = await Product.find().where('isTop', true).sort({ createTime: -1 }).limit(6);
    //返回值给页面
    response.render('product', {
        data: {
            productContent: productContent,
            productsTop: productsTop,
            productsHot: productsHot,
            brands: brands,
            categorys: categorys,
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