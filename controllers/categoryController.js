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
    if (!request.body.parentId){
        category.save().then(document => response.send(
            {
                status: 1,
                message: '新增成功！'
            }
        ))
    }else{
        // 根据id查找
        Category.update({ key: request.body.parentId }, { $push: { children: category } })
            .then(document => response.send(
                {
                    status: 1,
                    message: '更新成功！'
                }
            ))
    }
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
        parentId: request.body.parentId,
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
    const id = request.body.key;
    const parentId = request.body.parentId;
    console.log('key' + id +'parentId'+parentId)
    if (parentId){
        // 根据id查找
        // Category.update({ key: request.body.parentId }, { $push: { children: category } })
        Category.update({ key: request.body.parentId }, { $pull: { children: { key: request.body.key} } })
            .then(document => response.send(
                {
                    status: 1,
                    message: '删除成功！'
                }
            ))
    }else{
        Category.findByIdAndRemove(id)
            .then(document => response.send(
                {
                    status: 1,
                    message: '删除成功！'
                }
            ))
    }

}

module.exports = {
    index,
    list,
    store,
    show,
    update,
    destroy
};