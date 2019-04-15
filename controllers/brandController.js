//导入数据模型
const brand = require('../models/brand')
//查询数据列表
const index = (request, response) => {
    brand.find()
        .then(documents => response.render('brand',
            {
                total: documents.length,
                data: documents
            }
        )
    )
}  
//查询数据列表
const list = (request, response) => {
    brand.find()
        .then(documents => response.send(
           {
                total: documents.length,
                data: documents
            }
        ))
}

//创建单个文档
const store = (request, response) => {
    const brand = new brand({
        name: request.body.name,
        type: request.body.type,
        seotitle: request.body.seotitle,
        seokeyworlds: request.body.seokeyworlds,
        seodescription: request.body.seodescription,
        description: request.body.description,
        filename: request.body.filename,
        thumb: request.body.thumb
    })
    brand.save()
        .then(document => response.send(document))
}

//查找文档根据关键词
const show = (request, response) => {
    brand.find({}).pretty()
        .then(documents => {
            response.send(documents)
        })
}

//更新文档根据id
const update = (request, response) => {
    const id = request.params.id;
    const body = {
        name: request.body.name,
        type: request.body.type,
        seotitle: request.body.seotitle,
        seokeyworlds: request.body.seokeyworlds,
        seodescription: request.body.seodescription,
        description: request.body.description,
        filename: request.body.filename,
        thumb: request.body.thumb
    }
    brand.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(document => response.json(document))
}

//删除文档
const destroy = (request, response) => {
    const id = request.params.id;
    brand.findByIdAndRemove(id)
        .then(document => response.send(document))
}

module.exports = {
    index,
    list,
    store,
    show,
    update,
    destroy
};