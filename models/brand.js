const db = require('../config/database')

const options = {

}

//创建集合
const schema = new db.Schema({
    name: String,
    type: String,
    thumb: Array
}, options)

const brand = db.model('brand', schema)

module.exports = brand
