//导入数据模型
const Category = require('../models/category')

//查询数据列表
const index = (request, response) => {
    Product.find()
        .then(documents => response.render('category',
            {
                total: documents.length,
                data: documents
            }
        )
    )
}  
//查询数据列表
const list = (request, response) => {
    Category.find().where('type', request.query.type)
        .then(documents => 
            response.send(
           {
                total: documents.length,
                data: documents
            }
        ))
}


//创建单个文档
const store = (request, response) => {
    const category = new Category({
        key: (new Date()).getTime(),
        name: request.body.name,
        title: request.body.name,
        type: request.body.type,
        thumb: request.body.thumb,
        description: request.body.description,
        children: request.body.children,
        parentId: request.body.parentId,
    })
    // 根据id查找
    category.save().then().then(document => response.send(
            {
                status: 1,
                message: '更新成功！'
            }
        ))

}

//查找文档根据关键词
const show = (request, response) => {
    Category.find({}).pretty()
        .then(documents => {
            response.send(documents)
        })
}

//更新文档根据id
const update = (request, response) => {
    const id = request.body.id;
    const body = {
        name: request.body.name,
        title: request.body.name,
        description: request.body.description,
        thumb: request.body.thumb,
    }
    Category.findByIdAndUpdate(id, { $set: body })
        .then(document => response.send(
            {
                status: 1,
                message: '更新成功！'
            }
        ))
}

//删除文档
const destroy = (request, response) => {
    const id = request.body.id;
    Category.findByIdAndRemove(id)
        .then(document => response.send(
            {
                status: 1,
                message: '删除成功！'
            }
        ))

}

module.exports = {
    index,
    list,
    store,
    show,
    update,
    destroy
};