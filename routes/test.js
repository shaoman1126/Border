

let router = require('koa-router')();





router.post("/test/test", async (ctx, next) => {
    let { username, password } = ctx.request.body;

    ctx.body = {
        username: username,
        password: password
    }
})