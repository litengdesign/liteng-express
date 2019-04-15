import express from 'express';
import path from 'path';
import morgan from 'morgan';
const multer = require('multer')
const app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
   res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
   // res.header('Access-Control-Allow-Headers', '');
   res.header("Access-Control-Allow-Headers", "*");
   res.header('Access-Control-Allow-Methods', '*');
   res.header('Access-Control-Allow-Credentials', 'true');
   next();
});

//文件上传模块
const storage = multer.diskStorage({
   // destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
   destination(req, res, cb) {
      cb(null, 'public/uploads/');
   },
   filename(req, file, cb) {
      const filenameArr = file.originalname.split('.');
      cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
   }
});
const upload = multer({ storage });
//文件上传入口
app.post('/upload', upload.single('file'), (request, response, next) => {
   response.send(request.file)
})
app.use(morgan('dev'))
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//获取放置在public文件夹下的静态文件,
app.use('/public', express.static(__dirname + '/public'));
//api router
const homeRouter = require('./routers/homeRouter')
const productsRouter = require('./routers/productsRouter')
const postsRouter = require('./routers/postsRouter')
const userRouter = require('./routers/userRouter')
const categoryRouter = require('./routers/categoryRouter')
//客户端视图
app.use('/', [homeRouter, productsRouter, postsRouter, categoryRouter, userRouter]);

//设置视图路经
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//设置端口号
const port = process.env.PORT || 3000;
//启动服务
app.listen(port, () => {
   console.log(`监听端口：${port}`);
})
