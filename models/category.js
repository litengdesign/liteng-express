const db = require('../config/database')

const options = {

}

//创建集合
const schema = new db.Schema({
    name: String,
    type: String,
    thumb: Array,
    children: Array,
}, options)

const category = db.model('category', schema)

module.exports = category
