
let Koa = require("koa");
let app = new Koa();
let koajwt = require("koa-jwt")
let bodyparser = require('koa-bodyparser')
let logger = require("koa-logger");
let json = require("koa-json");
let views = require("koa-views");
let onerror = require("koa-onerror");
const log4js = require('./utils/log4j'); //错误提示

const router = require('koa-router')();



onerror(app);

require("./config/db");




let users = require("./routes/v1/users"); //用户
let goods = require("./routes/v1/goods"); //商品
let commodity = require("./routes/v1/commodity"); //酒商品
let orders = require("./routes/v1/order"); //订单

// global middlewares
app.use(views("views", {
  root: __dirname + "/views",
  default: "jade"
}));

app.use(require("koa-bodyparser")());
// middlewares
app.use(bodyparser({
  enableTypes: ["json", "form", "text"]
}))
app.use(require('koa-static')(__dirname + '/public'));



// 路由
router.use(users.routes(), users.allowedMethods()); //
router.use(goods.routes(), goods.allowedMethods()); //
router.use(orders.routes(), orders.allowedMethods()); //
router.use(commodity.routes(), commodity.allowedMethods());

app.use(router.routes(), router.allowedMethods())

app.on('error', (err, ctx) => {
  console.log("进来了")
  log4js.error(`${err.stack}`)
});

module.exports = app;
