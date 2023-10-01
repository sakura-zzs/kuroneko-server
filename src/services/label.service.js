const connection = require('../app/database')

class LabelService{
  async createLabel(name) {
    const statement = `INSERT INTO label (name)VALUES(?);`
    const [res] = await connection.execute(statement, [name])
    return res
  }
  async getLabelByName(name) {
    const statement = `SELECT name FROM label WHERE name=?;`
    const [res] = await connection.execute(statement, [name])
    return res[0]
  }
  async getLabelList() {
    const statement = `SELECT name FROM label;`
    const [res] = await connection.execute(statement)
    return res
  }
}

module.exports=new LabelService()