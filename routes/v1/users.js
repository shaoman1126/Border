let router = require('koa-router')();
const log4js = require("../../utils/log4j");
const utils = require("../../utils/utils");
const User = require("../../models/userSchema"); //用户信息模型
const md5 = require('md5');
const jwt = require("jsonwebtoken")



//用户注册
router.post("/v1/register", async (ctx, next) => {
    let data = ctx.request.body;
    let info
    const { username, password } = data;

    if (username && password) {
        const res = await User.findOne({ username })
        if (res) {
            info = utils.fail("已经有数据了", 400, username)
        } else {
            let res = await User.create({
                username,
                password: md5(password)
            });
            info = utils.success(res, "添加成功", 200)
        }
    } else {
        info = utils.fail("请输入正确用户名和密码", 400, data)
    }
    ctx.body = info;
})



//用户登录
router.post("/v1/login", async (ctx, next) => {
    let data = ctx.request.body;
    let info
    let { username, password } = data;
    if (username && password) {
        let res = await User.findOne({
            username,
            password: md5(password)
        });
        if (res) {
            let logindata = res._doc;
            const token = jwt.sign({
                res
            }, "imooc", { expiresIn: "1h" });
            logindata.token = token;
            log4js.info(logindata)
            info = utils.success(logindata, "登录成功", 200)
        } else {
            info = utils.fail("请输入正确的密码", 20001, data)
        }
    } else {
        info = utils.fail("请传入正确的参数", 400, data)
    }
    ctx.body = info
})






module.exports = router;