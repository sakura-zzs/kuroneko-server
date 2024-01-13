const connection = require('../app/database')

class CommentService{
  async createComment(content, userId, momentId) {
    const statement = `INSERT INTO comment (content,userId,momentId) VALUES(?,?,?);`
    const [res] = await connection.execute(statement, [content, userId, momentId])
    return res
  }
  async replyComment(content, userId, momentId,commentId) {
    const statement = `INSERT INTO comment (content,userId,momentId,commentId) VALUES(?,?,?,?);`
    const [res] = await connection.execute(statement, [content, userId, momentId,commentId])
    return res
  }
  async getUserCommentList(userId, offset = 0, limit = 5) {
    const statement=`SELECT c1.id,c1.content,c1.userId,c1.momentId,IF(c1.commentId IS NULL,c1.commentId,JSON_OBJECT("id",c2.id,"content",c2.content,"user",JSON_OBJECT("id",p.id,"nickName",p.nickName,"sex",p.sex,"location",p.location,"selfProfile",p.selfProfile,"birth",p.birth),"momentId",c2.momentId,"commentId",c2.commentId)) comment
    FROM comment c1 
    LEFT JOIN comment c2 
    ON c1.commentId=c2.id
    LEFT JOIN profiles p
    ON c2.userId=p.id
    WHERE c1.userId=?
    ORDER BY c1.id DESC
    LIMIT ?,?;`
    const [res] = await connection.execute(statement, [userId, offset, limit])
    return res
  }
  async getCommentCmtsById(id) {
    const statement=`WITH RECURSIVE cte AS (
      SELECT * FROM comment WHERE id=?
      UNION ALL
      SELECT c.* FROM comment c INNER JOIN cte ON c.commentId = cte.id
    )
    SELECT * FROM cte WHERE commentId IS NOT NULL ORDER BY id DESC;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  async getTopCommentByMomentId(momentId) {
    const statement = `SELECT * FROM comment WHERE momentId=? AND commentId IS NULL ORDER BY id DESC;`
    const [res] = await connection.execute(statement, [momentId])
    return res
  }
  async updateCommentById(content,commentId) {
    const statement = `UPDATE comment SET content=? WHERE id=?;`
    const [res] = await connection.execute(statement, [content, commentId])
    return res
  }
  async deleteCommentById(commentId) {
    const statement = `DELETE FROM comment WHERE id=?;`
    const [res] = await connection.execute(statement, [commentId])
    return res
  }
}

module.exports=new CommentService()