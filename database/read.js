const Post = require('../models/posts')


Post.find()
  .then(documents =>{
      console.log(documents)
  })
