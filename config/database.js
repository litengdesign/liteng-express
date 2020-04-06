const mongoose = require('mongoose')
const uri = 'mongodb://root:Lee19910205@47.92.118.228:27017/mbAutomationDB'

// const uri = 'mongodb://root:root@localhost:27017/expressDB'
const options = {
  useNewUrlParser: true,
  authSource: "admin"
}
mongoose.Promise = global.Promise
mongoose
  .connect(uri, options)
  .then(db => console.log(uri + '😊数据库连接成功 ～'))
  .catch(error => console.log('数据库连接失败！'))

module.exports = mongoose  