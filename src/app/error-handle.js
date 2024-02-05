const errorType = require('../constants/error-type')
//错误处理
function errorHandle(err, ctx) {
  let status, message
  switch (err.message) {
    case errorType.EMAIL_OR_PASSWORD_IS_NULL:
      status = 200;
      message = { code: 1001, msg: "邮箱或密码不能为空！" };
      break;
    case errorType.EMAIL_OR_PASSWORD_IS_INVALID:
      console.log(111);
      status = 200;
      message = { code: 1002, msg: "邮箱或密码格式无效！" };
      break;
    case errorType.EMAIL_IS_DUPLICATED:
      status = 200;
      message = { code: 1003, msg: "邮箱已被使用！" };
      break;
    case errorType.EMAIL_IS_EXIST:
      status = 200;
      message = { code: 1004, msg: "用户不存在！" };
      break;
    case errorType.PASSWORD_IS_INCORRECT:
      status = 200;
      message = { code: 1005, msg: "密码错误！" };
      break;
    case errorType.UNAUTHORIZATION:
      status = 200;
      message = { code: 1006, msg: "用户未登录！" };
      break;
    case errorType.UPLOAD_IMAGE_FAIL:
      status = 200;
      message = { code: 2001, msg: "图片文件上传失败！" }
      break;
    case errorType.USER_IS_NOT_PERMISSION:
      status = 200;
      message = { code: 1007, msg: "用户无此权限或无此数据！" }
      break;
    case errorType.LABEL_IS_EXIST:
      status = 200;
      message = { code: 3001, msg: "标签已存在！" }
      break;
    case errorType.LABEL_IS_ADDED:
      status = 200;
      message = { code: 3002, msg: "动态已添加该标签！" }
      break;
    case errorType.WXUSER_IS_NOT_EXIST:
      status = 200;
      message = { code: 1008, msg: "此微信用户没有绑定账号！" }
      break;
    default:
      status = 404;
      message = "Not Found~";
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandle;