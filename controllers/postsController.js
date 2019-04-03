//导入数据模型
const Post = require('../models/posts')

//查询数据列表
const index = (request,response) =>{
    Post.find()
        .then(documents => response.send(documents))  
}

//创建单个文档
const store = (request, response) => {
    const post = new Post({
        title: request.body.title
    })
    post.save()
        .then(document => response.send(document))
}

//查找文档根据id
const show = (request,response)=>{
    const id = request.params.id;

    Post.findById(id)
      .then(documents =>{
          response.send(documents)
      })
}

//更新文档根据id
const update = (request,response)=>{
    const id = request.params.id;
    const body = {
        title: request.body.title
    }
    console.log(body.title)
    Post.findByIdAndUpdate(id,{ $set: body }, {new:true})
        .then(document => response.send(document))
}

//删除文档
const destroy = (request,response)=>{
    const id = request.params.id;
    Post.findByIdAndRemove(id)
        .then(document => response.send(document))
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}; 