const connection = require('../app/database')

class AuthService {
  async checkResourcePermission(tableName, userId, resourceId, commentId) {
    if (tableName === 'profiles') {
      return true
    }
    const statement = `SELECT * FROM ${tableName} WHERE userId=? AND id=?;`
    const [res] = await connection.execute(statement, [userId, resourceId])
    let flag = res.length
    //绑定评论id，还需要检测该评论是否为该用户所创
    if (tableName == "comment_img" && commentId) {
      const statement1 = `SELECT * FROM comment WHERE userId=? AND id=?;`
      const [user_comment] = await connection.execute(statement1, [userId, commentId])
      console.log(user_comment)
      flag = user_comment.length
    }

    return flag
  }

  async verifyWxUserLogin(openid) {
    const statement = `SELECT * FROM users WHERE openid=?`
    const [res] = await connection.execute(statement, [openid])
    return res[0]
  }
  async saveOpenId(userId, session_key, openid) {
    const statement = `UPDATE users SET openid=?,session_key=? WHERE userId=?;`
    const [res] = await connection.execute(statement, [openid, session_key, userId])
    return res
  }
}

module.exports = new AuthService()