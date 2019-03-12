const jwt = require('jsonwebtoken')

const authenticate = (request,response,next) => {
    const token = request.header('X-Access-Token')
    console.log(token)
    if(token){
        jwt.verify(token,'I_LOVE_LITENG',(error,decoded) =>{
            if(error){
                return response.send(error)
            }else{
                request.decoded = decoded
                next();
            }
        })
    }else{
        return response.status(403).send({
            message:'没有权限访问'
        })
    }
}

module.exports = authenticate