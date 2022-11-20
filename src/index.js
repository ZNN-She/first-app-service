// 启动入口
const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const routerResponse = require('./middlewares/routerResponse')
const config = require('./config/default')
const router = require('./router/index')

const app =  new Koa()

// 日志
// app.use(logger());
// 跨域配置
app.use(cors());
// 请求参数处理成json 
app.use(bodyParser());
// 添加请求结果的中间件，统一封装返回结构体，在context中添加fail和success方法请求返回结果里有用到
app.use(routerResponse)
// 路由
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port)

console.log(`listening on port ${config.port}`)