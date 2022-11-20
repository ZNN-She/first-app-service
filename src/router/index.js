const user = require("./user");

async function userRouters(ctx, next) {
  ctx.app.use(user.routes()).use(user.allowedMethods());
  await next();
}

module.exports = userRouters;