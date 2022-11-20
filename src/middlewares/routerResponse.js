module.exports = async (ctx, next) => {
  ctx.success = async (data) => {
    ctx.type = 'json'
    ctx.body = {
      code: 200,
      msg: 'success',
      data: data
    }
  }

  ctx.fail = async (msg, code) => {
    ctx.type = 'json'
    ctx.body = {
      code: code || 500,
      msg: msg || 'fail',
    }
  }

  await next()
}