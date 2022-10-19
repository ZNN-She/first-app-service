const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('@koa/cors')
const Router = require('@koa/router')
const routerResponse = require('./middlewares/routerResponse')
const userRouters = require('./router/index');
const bodyParser = require('koa-bodyparser');
const { default: mongoose } = require('mongoose');

const router = new Router()
const app = new Koa();


// middlewares

app.use(logger());

// 统一返回值
app.use(bodyParser());
app.use(routerResponse());

// 路由
app.use(cors())
app.use(userRouters);
router.get("/koa/test", async (ctx, next) => {
  console.log("ajax called.")
  ctx.set("Content-Type", "application/json")
  ctx.body = '123'
})
app.use(router.routes())
app.use(router.allowedMethods())

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27017/app');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('链接数据库成功')
});



app.listen(8080);