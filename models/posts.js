const db = require('../config/database')

const options = {

}

//创建集合
const schema = new db.Schema({
    name: String,
    thumb: Array,
    description: String,
    content: String,
    status: Boolean,
    category: Object,
    isTop: Boolean,
    createTime: Number
},options)

const post = db.model('posts', schema)

module.exports = post
