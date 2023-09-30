const connection=require('../app/database')
class FileService{
  async saveMomentImage(...data) {
    //将图片地址保存至数据库
    const [filename, mimetype, size, url, id] = data
    const statement = `INSERT INTO moment_img (filename,mimetype,size,url,userId)VALUES(?,?,?,?,?);`
    return await connection.execute(statement,[filename, mimetype, size, url, id])
  }
  //根据文件名返回图片地址和id
  async getImageUrlByFileName(filename) {
    const statement = `SELECT url,id FROM moment_img WHERE filename=?;`
    const res = await connection.execute(statement, [filename])
    return res[0][0]
  }
  //根据id删除图片
  async deleteMomentImageById(id) {
    const statement = `DELETE FROM moment_img WHERE id=?;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  //富文本保存，将moment与moment_img进行绑定-更新moment_img的momentId
  async updateMomentIdById(id, momentId) {
    const statement = `UPDATE moment_img SET momentId=? WHERE id=?;`
    const [res] = await connection.execute(statement, [momentId, id])
    return res
  }
}

module.exports=new FileService()