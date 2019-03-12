const data = require('./postsJson');
const Posts = require('../../models/posts');

Posts.insertMany(data)
  .then(()=>{
      console.log('数据插入成功！')
  })