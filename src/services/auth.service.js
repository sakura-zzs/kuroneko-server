const connection = require('../app/database')

class AuthService {
  async checkResourcePermission(tableName, userId, resourceId, commentId) {
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
}

module.exports = new AuthService()