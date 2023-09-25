const connection=require('../app/database')
class FileService{
  async saveMomentImage(...data) {
    //将图片地址保存至数据库
    const [filename, mimetype, size, url, id] = data
    const statement = `INSERT INTO moment_img (filename,mimetype,size,url,userId)VALUES(?,?,?,?,?);`
    return await connection.execute(statement,[filename, mimetype, size, url, id])
  }
  //根据文件名返回图片地址
  async getImageUrlByFileName(filename) {
    const statement = `SELECT url FROM moment_img WHERE filename=?;`
    const res = await connection.execute(statement, [filename])
    return res[0][0]
  }
}

module.exports=new FileService()