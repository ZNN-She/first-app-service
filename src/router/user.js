const Router = require('@koa/router')
const { default: mongoose } = require('mongoose')


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
})
// userSchema.index({username: 1, password: 1})

var User = mongoose.model('User', userSchema);


const user = new Router({
  prefix: '/user'
})

user.post('/login', (ctx) => {
  ctx.success('登录成功')
})

user.post('/register', (ctx) => {
  console.log(ctx.request.body)
  const { body } = ctx.request;
  try{
    if (!body.username) {
      ctx.fail('用户名不能为空')
    } else if (!body.password || !body.passwordAffirm) {
      ctx.fail('密码不能为空')
    } else if (body.password !== body.passwordAffirm) {
      ctx.fail('两次输入的密码不一致')
    } else {
      const use = new User({
        username: body.username,
        password: body.password
      })
      use.save(function (err) {
        if (err) {
          console.log(err)
          ctx.fail(err);
        } else {
          ctx.success('注册成功')
        }
      })
    }
  }catch(e){
    console.log(e)
    ctx.fail('系统异常')
  }
})

user.get('/list', (ctx) => {
  ctx.success([
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
  ])
})

module.exports = user