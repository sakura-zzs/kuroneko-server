// 加密
const crypto = require('crypto')

const md5 = crypto.createHash('md5')

function MD5Pwd(data) {
  //以十六进制的形式获取加密的数据
  const pwd = md5.update(data).digest('hex')
  return pwd
}

module.exports=MD5Pwd
