//导入数据模型
const Post = require('../models/posts')

const index = (request, response) => {
    Post.find()
        .then(documents => response.render('index', { data: documents}))  
}
module.exports = {
    index
}; 