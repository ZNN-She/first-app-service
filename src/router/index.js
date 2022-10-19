const user = require("./user");

function userRouters(ctx, next) {
  ctx.app.use(user.routes()).use(user.allowedMethods());
  next();
}

module.exports = userRouters;