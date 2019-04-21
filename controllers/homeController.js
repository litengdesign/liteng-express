//导入数据模型
const Post = require('../models/posts')
const Product = require('../models/products')
const Category = require('../models/category')
let brands = []; //品牌列表
let categorys = []; //分类列表
let productsTop = []; //推荐产品
let productsHot = []; //热门产品
let postsTop = [];//推荐文章
//获取所有品牌
const index = async(request, response) => {
    brands = await Category.find().where('type', 'brand');
    categorys = await Category.find().where('type', 'product');
    productsHot = await Product.find().where('isTop', true).limit(5);
    postsTop = await Post.find().where('category.label', '行业新闻').limit(2)
    productsTop = await Product.find().where('isTop', true).sort({ createTime: -1 }).limit(6);
    //返回值给页面
    response.render('index', {
        data: {
            productsTop: productsTop,
            productsHot: productsHot,
            brands: brands,
            categorys: categorys,
            postsTop: postsTop,
        }
    })
}
module.exports = {
    index
}; 