const db = require('../config/database')

const options = {

}

//创建集合
const schema = new db.Schema({
    name: String,
    thumb: Array,
    description: String,
    priceMonth: String,
    content: String,
    status: Boolean,
    category: Object,
    brand: Object,
    code:String,
    minShopping:String,
    useShopping: String,
    isTop: Boolean,
    createTime: Number,
},options)

const product = db.model('product', schema)

module.exports = product
