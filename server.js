import express from 'express';
import path from 'path';
import morgan from 'morgan';
const app = express();

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })



app.use(morgan('dev'))
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//获取放置在public文件夹下的静态文件,
app.use(express.static(__dirname + '/src'));
const port = process.env.PORT || 3000;

//router
const homeRouter = require('./routers/homeRouter')
const postRouter = require('./routers/postsRouter')
const userRouter = require('./routers/userRouter')


app.use('/', [homeRouter]);
app.use('/api', [postRouter, userRouter]);

//上传单个文件
app.post('/profile', upload.single('avatar'), (request, response, next) => {
   response.send(request.file)
})

//上传多个文件
app.post('/photos/upload', upload.array('photos', 3), (request, response, next) => {
   response.send(request.files)
})

//设置视图路经
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//启动服务
app.listen(port, () => {
   console.log(`监听端口：${port}`);
})