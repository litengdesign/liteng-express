const Menu = require('../models/menu');
//查询数据列表
const list = (request, response) => {
    Menu.find().sort({ serial: 1 })
        .then(documents => response.send(
            {
                total: documents.length,
                data: documents
            }
        ))
}

//创建单个文档
const store = (request, response) => {
    const menu = new Menu({
        name: request.body.name,
        link: request.body.link,
        serial: request.body.serial,
        target: request.body.target || false
    })
    menu.save()
        .then(document => response.send(
            {
                status: 1,
                message: '新增成功！'
            }
        ))
}

//更新文档根据id
const update = (request, response) => {
    const id = request.body.id;
    const body = {
        name: request.body.name,
        link: request.body.link,
        serial: request.body.serial,
        target: request.body.target
    }
    Menu.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(document => response.send(
            {
                status: 1,
                message: '更新成功！'
            }
        ))
}

//删除文档
const destroy = (request, response) => {
    const id = request.params.id;
    Menu.findByIdAndRemove(id)
        .then(document => response.send(
            {
                status: 1,
                message: '删除成功！'
            }
        ))
}

module.exports = {
    list,
    store,
    update,
    destroy
};