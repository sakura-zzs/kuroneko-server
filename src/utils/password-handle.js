// 加密
const crypto = require('crypto')
const bcrypt=require('bcrypt')
const md5 = crypto.createHash('md5')

function MD5Pwd(data) {
  //以十六进制的形式获取加密的数据
  console.log(data)
  const pwd = md5.update(data).digest('hex')
  console.log(pwd)
  return pwd
}

function bcryptOfPwd(data) {
  const saltRounds = 10
  const hash = bcrypt.hashSync(data, saltRounds)
  return hash
}

module.exports = {
  MD5Pwd,
  bcryptOfPwd
}
