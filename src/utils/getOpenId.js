const axios = require('axios')

async function getOpenId(code) {
  const appid = "wx54e2a569f137a006"
  const secret = "8ef719a6d56d1f56f8f2ed31b991b311"
  const { data } = await axios({
    method: 'get',
    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
  })
  return data
}

module.exports = getOpenId 