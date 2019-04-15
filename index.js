const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
//获取放置在public文件夹下的静态文件,
app.use(express.static(__dirname + '/src'));
//设置视图路经
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => res.render('index', { data: { title:'hello'}}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))