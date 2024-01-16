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
    //使用分组查询和group_concat将moment的多个图片和多个标签以（JSON_OBJECT）对象形式拼接，并使用JSON_ARRAY转为数组
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
    ) profile,
  JSON_ARRAY(GROUP_CONCAT(JSON_OBJECT("id",mi.id,"filename",mi.filename,"mimetype",mi.mimetype,"size",mi.size,"url",mi.url))) momentImg,
  JSON_ARRAYAGG(JSON_OBJECT("id",l.id,"name",l.name)) labelList
  FROM
    moment m
    LEFT JOIN avatar_img a ON m.userId = a.userId
    LEFT JOIN PROFILES p ON m.userId = p.id 
    LEFT JOIN moment_img mi ON m.id=mi.momentId
    LEFT JOIN moment_label ml ON m.id=ml.momentId
    LEFT JOIN label l ON ml.labelId=l.id
  GROUP BY m.id
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