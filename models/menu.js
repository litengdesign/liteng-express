const db = require('../config/database')

const options = {

}

//创建集合
const schema = new db.Schema({
    name: String,
    link: String,
    serial: Number,
    target: Boolean
}, options)

const menu = db.model('menu', schema)

module.exports = menu
