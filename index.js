// const crypto = require('crypto')
// const hash = crypto.createHash('sha256')
// hash.update('password')
// console.log(hash.digest('base64'))

const bcrypt  = require('bcrypt')
// const password = '123456'

// //密码加密
// bcrypt.genSalt(10,(error,salt)=>{
//     console.log('salt:', salt)
//     bcrypt.hash(password,salt,(error,hash)=>{
//         console.log('hash: ',hash)
//     })
// })

const hashPassword = '$2b$10$1ubVFoJPsjbDUvNoLf8NZua2bdf0bGRiCYfrUeZasy1nGTMfSF7VG'
const userInputPassword = '123456'

bcrypt.compare(userInputPassword,hashPassword)
    .then(result => console.log(result))

