const connection = require('../app/database')

class MomentService {
  async createMoment(title, content, userId) {
    const statement = `INSERT INTO moment (title,content,userId) VALUES(?,?,?);`
    const [res] = await connection.execute(statement, [title, content, userId])
    return res
  }
  async getMomentListByUserId(userId) {
    const statement = `SELECT * FROM moment WHERE userId=?;`
    const [res] = await connection.execute(statement, [userId])
    return res
  }
  async getAllMoment() {
    const statement = `SELECT
    m.*,
    JSON_OBJECT( "url", a.url ) avatar,
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
      p.birth 
    ) PROFILE,
  JSON_ARRAY(JSON_OBJECT("id",mi.id,"filename",mi.filename,"mimetype",mi.mimetype,"size",mi.size,"url",mi.url)) momentImg	
  FROM
    moment m
    LEFT JOIN avatar_img a ON m.userId = a.userId
    LEFT JOIN PROFILES p ON m.userId = p.id 
    LEFT JOIN moment_img mi ON m.id=mi.momentId
  ORDER BY
    m.createTime DESC;`
    const [res] = await connection.execute(statement)
    return res
  }
  async getMomentById(id) {
    const statement = `SELECT * FROM moment WHERE id=?;`
    const [res] = await connection.execute(statement, [id])
    return res[0]
  }
  async updateMomentById(content, id) {
    const statement = `UPDATE moment SET content=? WHERE id=?;`
    const [res] = await connection.execute(statement, [content, id])
    return res
  }
  async deleteMomentById(id) {
    const statement = `DELETE FROM moment WHERE id=?;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  async bindLabel(labelId, momentId) {
    const statement = `INSERT INTO moment_label (momentId,labelId) VALUES(?,?);`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return res
  }
}

module.exports = new MomentService()