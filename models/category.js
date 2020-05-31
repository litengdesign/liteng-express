const db = require('../config/database')
const options = {
}
//创建集合
const schema = new db.Schema({
    key:Number,
    name: String,
    title:String,
    type: String,
    thumb: Array,
    description: String,
}, options)


const category = db.model('category', schema)

module.exports = category
