const db = require('../config/database')

const options = {

}

//创建集合
const schema = new db.Schema({
    title:{
        type: String
    }
},options)

const post = db.model('posts', schema)

module.exports = post
