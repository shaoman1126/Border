

let router = require('koa-router')();





router.get("/test/test", async (ctx, next) => {
    // let { username, password } = ctx.request.body;

    ctx.body = {
        username: 11,
        password: 222
    }
})


module.exports = router