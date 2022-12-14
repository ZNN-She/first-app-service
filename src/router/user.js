const Router = require('@koa/router')
const UserModel = require('../db/user')

const userRoters = new Router({
  prefix: '/user'
})

// 参数验证
const hasParams = async (ctx, next) => {
  const { body } = ctx.request;
  if (!body.username) {
    await ctx.fail('用户名不能为空')
  } else if (!body.password || !body.passwordAffirm) {
    await ctx.fail('密码不能为空')
  } else if (body.password !== body.passwordAffirm) {
    ctx.fail('两次输入的密码不一致')
  }else{
    await next()
  }
  
}

userRoters.post('/login', (ctx) => {
  ctx.success('登录成功')
})

userRoters.post('/register', hasParams, async (ctx, next) => {
  const { body } = ctx.request;
  try {
    const res = await UserModel.save({
      username: body.username,
      password: body.password
    })
    ctx.success('注册成功')
    next()
  } catch (e) {
    console.log(e)
    ctx.fail('系统异常')
    next()
  }
})

userRoters.get('/list', async (ctx, next) => {
  try {
    const res = await UserModel.query({});
    console.log(res)
    await ctx.success(res)
  } catch (error) {
    await ctx.fail(error)
  }
})

module.exports = userRoters