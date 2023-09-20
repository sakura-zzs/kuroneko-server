const mysql = require('mysql2')

const config=require('./config')
//创建连接池
const pool = mysql.createPool({
  host:config.MYSQL_HOST,
  port:config.MYSQL_PORT,
  database:config.MYSQL_DATABASE,
  user:config.MYSQL_USER,
  password:config.MYSQL_PASSWORD,
})

//监听数据库连接状态
pool.getConnection((err, connection) => {
  if (err) {
    console.log("获取连接失败", err)
    return
  }
  //获取connection尝试与数据库进行连接
  connection.connect(err => {
    if (err) {
      console.log("数据库连接失败", err) 
      return
    }
    console.log("数据库连接成功")
  })
})

module.exports=pool.promise()