const connection=require('../app/database')

class AuthService{
  async checkResourcePermission(tableName, userId, resourceId) {
    const statement = `SELECT * FROM ${tableName} WHERE userId=? AND id=?;`
    const [res] = await connection.execute(statement, [userId, resourceId])
    return res.length
  }
}

module.exports=new AuthService()