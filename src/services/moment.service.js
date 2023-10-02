const connection = require('../app/database')

class MomentService{
  async createMoment(content,userId) {
    const statement = `INSERT INTO moment (content,userId) VALUES(?,?);`
    const [res] = await connection.execute(statement, [content, userId])
    return res
  }
  async getMomentListByUserId(userId) {
    const statement = `SELECT * FROM moment WHERE userId=?;`
    const [res] = await connection.execute(statement, [userId])
    return res
  }
  async getAllMoment() {
    const statement = `SELECT * FROM moment;`
    const [res] = await connection.execute(statement)
    return res
  }
  async getMomentById(id) {
    const statement = `SELECT * FROM moment WHERE id=?;`
    const [res] = await connection.execute(statement, [id])
    return res[0]
  }
  async updateMomentById(content,id) {
    const statement = `UPDATE moment SET content=? WHERE id=?;`
    const [res] = await connection.execute(statement, [content,id])
    return res
  }
  async deleteMomentById(id) {
    const statement = `DELETE FROM moment WHERE id=?;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  async bindLabel(labelId,momentId) {
    const statement = `INSERT INTO moment_label (momentId,labelId) VALUES(?,?);`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return res
  }
}

module.exports=new MomentService()