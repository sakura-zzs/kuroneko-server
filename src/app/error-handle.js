const errorType = require('../constants/error-type')
//错误处理
function errorHandle(err,ctx) {
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
      message={code:2001,msg:"图片文件上传失败！"}
    default:
      status = 404;
      message = "Not Found~";
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandle;