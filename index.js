const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

//上传单个文件
app.post('/profile', upload.single('avatar'), (request, response, next) => {
    response.send(request.file)
})

//上传多个文件
app.post('/uploads',upload.array('photos',3),(request,response,next)=>{
    response.send(request.files)
})
app.listen(8080,()=>{
    console.log('localhost:8080')
})