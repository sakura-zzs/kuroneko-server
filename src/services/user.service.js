const connection = require('../app/database')

class UserService{
  async getUserList() {
     //编写预编译语句
    const statement='select * from users'
    const res = await connection.execute(statement)
    return res[0]
  }
  async getUserProfile(id) {
    const statement = 'SELECT * FROM users RIGHT JOIN profiles ON users.userId=profiles.id where id=?;'
    const res = await connection.execute(statement, [id])
    return res[0]
  }
  async createUser(email, pwd) {
    
    const statement = 'INSERT INTO `users`(email,pwd) VALUES(?,?);'
    const res = await connection.execute(statement, [email, pwd]);
    return res[0]
  }
  async getUserByEmail(email) {
    const statement = 'SELECT * FROM users WHERE email=?'
    const res = await connection.execute(statement, [email])
    return res[0][0]
  }
}

module.exports=new UserService()