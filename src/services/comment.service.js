const connection = require('../app/database')

class CommentService{
  async createComment(content, userId, momentId) {
    const statement = `INSERT INTO comment (content,userId,momentId) VALUES(?,?,?);`
    const [res] = await connection.execute(statement, [content, userId, momentId])
    return res
  }
}

module.exports=new CommentService()