const connection = require('../app/database')

class LabelService{
  async createLabel(name) {
    const statement = `INSERT INTO label (name)VALUES(?);`
    const [res] = await connection.execute(statement, [name])
    return res
  }
  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name=?;`
    const [res] = await connection.execute(statement, [name])
    return res[0]
  }
  async getLabelList() {
    const statement = `SELECT * FROM label;`
    const [res] = await connection.execute(statement)
    return res
  }
  async getLabelByMomentIdAndLabelId(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE momentId=? AND labelId=?;`
    const [res] = await connection.execute(statement, [momentId, labelId])
    return res
  }
}

module.exports=new LabelService()