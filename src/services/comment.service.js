const connection = require('../app/database')

class CommentService {
  async createComment(content, userId, momentId) {
    const statement = `INSERT INTO comment (content,userId,momentId) VALUES(?,?,?);`
    const [res] = await connection.execute(statement, [content, userId, momentId])
    return res
  }
  async replyComment(content, userId, momentId, commentId) {
    const statement = `INSERT INTO comment (content,userId,momentId,commentId) VALUES(?,?,?,?);`
    const [res] = await connection.execute(statement, [content, userId, momentId, commentId])
    return res
  }
  async getUserCommentList(userId) {
    const statement = `SELECT c1.id,c1.content,c1.userId,c1.momentId,c1.createTime,IF(c1.commentId IS NULL,JSON_OBJECT("momentId",m.id,"content",m.content,"momentUserId",m.userId,"momentTitle",m.title),JSON_OBJECT("id",c2.id,"content",c2.content,"user",JSON_OBJECT("id",p.id,"nickName",p.nickName,"sex",p.sex,"location",p.location,"selfProfile",p.selfProfile,"birth",p.birth),"momentId",c2.momentId,"commentId",c2.commentId)) ReplyInfo
    FROM comment c1 
    LEFT JOIN comment c2 
    ON c1.commentId=c2.id
    LEFT JOIN profiles p
    ON c2.userId=p.id
    LEFT JOIN moment m
    ON c1.momentId=m.id
    WHERE c1.userId=14
    ORDER BY c1.id DESC;`
    const [res] = await connection.execute(statement, [userId])
    return res
  }
  async getCommentCmtsById(id) {
    const statement = `WITH RECURSIVE cte AS (
      SELECT * FROM comment WHERE id=?
      UNION ALL
      SELECT c.* FROM comment c INNER JOIN cte ON c.commentId = cte.id
    )
    SELECT cte.*,JSON_OBJECT(
        "id",
        p.id,
        "nickName",
        p.nickName,
        "sex",
        p.sex,
        "location",
        p.location,
        "selfProfile",
        p.selfProfile,
        "birth",
        p.birth 
      ) replyToUser,
      JSON_OBJECT(
        "id",
        p1.id,
        "nickName",
        p1.nickName,
        "sex",
        p1.sex,
        "location",
        p1.location,
        "selfProfile",
        p1.selfProfile,
        "birth",
        p1.birth,
        "avatar",
         ai.url
      ) userInfo
      FROM cte
    LEFT JOIN comment cm ON cte.commentId=cm.id
    LEFT JOIN profiles p ON cm.userId=p.id
    LEFT JOIN avatar_img ai ON cte.userId=ai.userId
    LEFT JOIN profiles p1 ON cte.userId=p1.id
    WHERE cte.commentId IS NOT NULL
    ORDER BY cte.createTime DESC;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  async getTopCommentByMomentId(momentId) {
    const statement = `SELECT
    c.*,
    JSON_OBJECT(
      "id",
      p.id,
      "nickName",
      p.nickName,
      "sex",
      p.sex,
      "location",
      p.location,
      "selfProfile",
      p.selfProfile,
      "birth",
      p.birth,
      "avatar",
       ai.url
    ) userInfo
  FROM
    comment c 
  LEFT JOIN profiles p ON c.userId=p.id
  LEFT JOIN avatar_img ai ON c.userId=ai.userId
  WHERE
    momentId =?
    AND commentId
    IS NULL 
  ORDER BY
    c.id DESC;`
    const [res] = await connection.execute(statement, [momentId])
    return res
  }
  async updateCommentById(content, commentId) {
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

module.exports = new CommentService()