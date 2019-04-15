const jwt = require('jsonwebtoken')
const token = require('./token')

const authenticate = (request, response, next) => {
    const tokenString = request.header('X-Access-Token')
    if (tokenString) {
        if (token.checkToken(tokenString)) {
            next();
        }else{
            return response.status(400).send({
                message: '请重新登录'
            })
        }
    } else {
        return response.status(403).send({
            message: '没有权限访问'
        })
    }
}

module.exports = authenticate