const userService = require('../services/user.service')

class UserController {
  async getUserList(ctx, next) {
    const res = await userService.getUserList()
    ctx.response.body = res
  }
  async getUserProfile(ctx, next) {
    const { id } = ctx.query
    const res = await userService.getUserProfile(id)
    ctx.response.body = res
  }
  async createUser(ctx, next) {
    const { email, pwd } = ctx.request.body
    const res = await userService.createUser(email, pwd)
    ctx.response.body = "创建成功"
  }
  async updateProfile(ctx, next) {
    const { id } = ctx.user
    const { nickName, sex, location, selfProfile, birth } = ctx.request.body
    const res = await userService.updateUserProfile(id, nickName, sex, location, selfProfile, birth)
    ctx.response.body = res
  }
}

module.exports = new UserController()