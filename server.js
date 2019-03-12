const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const postRouter = require('./routers/postsRouter')
const userRouter = require('./routers/userRouter')
const port = process.env.PORT || 3000;

app.use('/api', [postRouter, userRouter])
app.get('/',(request,response)=>{
   response.send("Hello node express api  ~");
})

app.listen(port,()=>{;
   console.log(`监听端口：${port}`);
})


