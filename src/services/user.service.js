const connection = require('../app/database')

class UserService {
  async getUserList() {
    //编写预编译语句
    const statement = 'select * from users'
    const res = await connection.execute(statement)
    return res[0]
  }
  async getUserProfile(id) {
    const statement = 'SELECT u.*,JSON_OBJECT("id",p.id,"nickName",p.nickName,"sex",p.sex,"location",p.location,"selfProfile",p.selfProfile,"birth",p.birth) profile,JSON_OBJECT("id",a.id,"filename",a.filename,"mimetype",a.mimetype,"size",a.size,"url",a.url) avatar FROM users u RIGHT JOIN profiles p ON u.userId=p.id LEFT JOIN avatar_img a ON u.userId=a.userId WHERE u.userId=?;;'
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
  async updateUserProfile(id, nickName, sex, location, selfProfile, birth) {
    const statement = `SELECT * FROM profiles WHERE id=?;`
    const [res] = await connection.execute(statement, [id])
    //创建用户个人信息
    if (!res.length) {
      const profileStatement = `INSERT INTO profiles (id,nickName,sex,location,selfProfile,birth) VALUES(?,?,?,?,?,?);`
      const createRes = await connection.execute(profileStatement, [id, nickName, sex, location, selfProfile, birth])
      return createRes[0]
    }
    console.log(id, nickName, sex, location, selfProfile, birth)
    //更新用户个人信息
    const profileStatement = `UPDATE profiles SET nickName=?,sex=?,location=?,selfProfile=?,birth=? WHERE id=?;`
    const updataeRes = await connection.execute(profileStatement, [nickName, sex, location, selfProfile, birth, id])
    console.log(updataeRes)
    return updataeRes[0]
  }
}

module.exports = new UserService()