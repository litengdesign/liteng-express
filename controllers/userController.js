const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const token =  require ('../middlewares/token')


//查询用户列表
const index = (request, response)=>{
    User.find()
        .then(documents => response.send(documents))  
}
//新增用户
const store = (request, response) => {
  const userName = request.body.userName
  bcrypt.hash(request.body.password, 10)
    .then(password => {
      const user = new User({
        userName,
        password
      })
      user.save()
        .then(() => response.send({ message: '注册成功' }))
        .catch(error => response.send(error))
    })
}
//登录
const auth = (request, response) => {
  User.findOne({ userName: request.body.userName})
    .then(user => {
      if (!user) {
        return Promise.reject({ status: 400,message: '没找到用户' })
      }

      bcrypt.compare(request.body.password, user.password)
        .then(result => {
          if (result) {
            const payload = {
              userName: user.userName
            }
            const tokenString = token.createToken(payload,18000)
            response.status(200).send(
              { 
                message: '登陆成功',
                token: tokenString
              }
            )
          } else {
            response.status(401).send({ message: '未通过身份验证' })
          }
        })
    })
    .catch(error => response.status(400).send(error))
}

//登出
const logout = (request, response)=>{

  response.send({ status: 200, message: '退出成功' })
    
}

const me = (request,response)=>{
   response.send(`hello~`)
}
module.exports = {
    store,
    index,
    auth,
    me,
    logout
}; 