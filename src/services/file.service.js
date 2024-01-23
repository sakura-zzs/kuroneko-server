const connection = require('../app/database')
class FileService {
  async saveMomentImage(...data) {
    //将图片地址保存至数据库
    const [filename, mimetype, size, url, id] = data
    const statement = `INSERT INTO moment_img (filename,mimetype,size,url,userId)VALUES(?,?,?,?,?);`
    return await connection.execute(statement, [filename, mimetype, size, url, id])
  }
  //根据文件名返回图片地址和id
  async getImageUrlByFileName(filename) {
    const statement = `SELECT url,id FROM moment_img WHERE filename=?;`
    const res = await connection.execute(statement, [filename])
    return res[0][0]
  }
  //根据id删除图片
  async deleteMomentImageById(id) {
    const getFilename = `SELECT filename FROM moment_img WHERE id=?`
    const statement = `DELETE FROM moment_img WHERE id=?;`
    const [filename] = await connection.execute(getFilename, [id])
    await connection.execute(statement, [id])
    return filename[0]
  }
  //富文本保存，将moment与moment_img进行绑定-更新moment_img的momentId
  async updateMomentIdById(id, momentId) {
    const statement = `UPDATE moment_img SET momentId=? WHERE id=?;`
    const [res] = await connection.execute(statement, [momentId, id])
    return res
  }
  async saveCommentImage(...data) {
    //将图片地址保存至数据库
    const [filename, mimetype, size, url, id] = data
    const statement = `INSERT INTO comment_img (filename,mimetype,size,url,userId)VALUES(?,?,?,?,?);`
    return await connection.execute(statement, [filename, mimetype, size, url, id])
  }
  async getCommentImageUrlByFileName(filename) {
    const statement = `SELECT url,id FROM comment_img WHERE filename=?;`
    const res = await connection.execute(statement, [filename])
    return res[0][0]
  }
  //根据id删除图片
  async deleteCommentImageById(id) {
    const getFilename = `SELECT filename FROM comment_img WHERE id=?`
    const statement = `DELETE FROM comment_img WHERE id=?;`
    const [filename] = await connection.execute(getFilename, [id])
    await connection.execute(statement, [id])
    return filename[0]
  }
  //富文本保存，将comment与comment_img进行绑定-更新comment_img的commentId
  //绑定评论id，还需要检测该评论是否为该用户所创
  async updateCommentIdById(id, commentId) {
    const statement = `UPDATE comment_img SET commentId=? WHERE id=?;`
    const [res] = await connection.execute(statement, [commentId, id])
    return res
  }
  async saveAvatarImage(...data) {
    //将图片地址保存至数据库
    console.log(data)
    const [filename, mimetype, size, url, id] = data
    const statement = `INSERT INTO avatar_img (filename,mimetype,size,url,userId)VALUES(?,?,?,?,?);`
    return await connection.execute(statement, [filename, mimetype, size, url, id])
  }
  async getAvatarImageUrlByFileName(filename) {
    const statement = `SELECT url,id FROM avatar_img WHERE filename=?;`
    const res = await connection.execute(statement, [filename])
    return res[0][0]
  }
  //根据id删除原头像
  async deleteAvatarImageById(userId) {
    const getFilename = `SELECT filename FROM avatar_img WHERE userId=?`
    const statement = `DELETE FROM avatar_img WHERE userId=?;`
    const [filename] = await connection.execute(getFilename, [userId])
    if (filename.length) {
      await connection.execute(statement, [userId])
      return filename
    }
    return 0
  }
  async saveSpaceImage(...data) {
    //将图片地址保存至数据库
    const [filename, mimetype, size, url, id] = data
    const statement = `INSERT INTO space_img (filename,mimetype,size,url,userId)VALUES(?,?,?,?,?);`
    return await connection.execute(statement, [filename, mimetype, size, url, id])
  }
  async getSpaceImageUrlByFileName(filename) {
    const statement = `SELECT url,id FROM space_img WHERE filename=?;`
    const res = await connection.execute(statement, [filename])
    return res[0][0]
  }
  //根据id删除图片
  async deleteSpaceImageById(id) {
    const statement = `DELETE FROM space_img WHERE id=?;`
    const [res] = await connection.execute(statement, [id])
    return res
  }
  //根据动态id获取动态图片
  async getMomentImgById(momentId) {
    const statement = `SELECT * FROM moment_img WHERE momentId=?;`
    const [res] = await connection.execute(statement, [momentId])
    return res
  }
}

module.exports = new FileService()