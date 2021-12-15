let router = require('koa-router')();
const log4js = require("../../utils/log4j");
const utils = require("../../utils/utils");
const Commoditys = require("../../models/commoditySchema"); //商品信息模型



//商品添加
router.post("/v1/add/commodity", async (ctx, next) => {
    let data = ctx.request.body;
    const { commodityName, commodityPrice } = data;
    let info;
    let result = await Commoditys.findOne({ commodityName });
    // log4js.info(result);
    if (commodityName && commodityPrice) {
        if (result) {
            info = utils.fail("数据已存在", "40004", null);
        } else {
            let res = await Commoditys.create(data);
            // log4js.info(res)
            if (res) {
                info = utils.success("ok", "操作成功", 200)
            } else {
                info = utils.fail("添加失败", 40008, null)
            }
        }
    } else {
        info = utils.fail("请填写必要的参数", 40005, null)
    }
    ctx.body = info;
});


//酒商品展示
router.get("/v1/list/commodity", async (ctx, next) => {
    let { ...params } = ctx.request.query;
    let info, count;
    let { page, skipIndex } = utils.pager(params);
    count = await Commoditys.find({}).count(); //查看全部数据
    // log4js.info(page);
    // log4js.info(skipIndex);
    if (params) {
        let data = await Commoditys.find({}).skip(skipIndex).limit(page.pageSize)
        console.log(data)
        info = utils.success({
            list: data || [],
            count: count,
            ...page
        }, "获取数据成功", 200)
    } else {
        info = utils.fail("请填写必要的参数", 40005, null)
    }
    ctx.body = info
});


//酒商品回显
router.get("/v1/echo/commodity", async (ctx, next) => {
    let { _id } = ctx.request.query;
    // log4js.info(_id)
    let info;
    let res = await Commoditys.findOne({ _id });
    log4js.info(res);
    if (res) {
        info = utils.success(res, "回显成功", 200)
    } else {
        info = utils.fail("回显失败", 40009, null)
    }
    ctx.body = info
})


//酒商品修改
router.post("/v1/edit/commodity", async (ctx, next) => {
    let { _id, ...params } = ctx.request.body;
    let info;
    let res = await Commoditys.updateOne({ _id: _id }, {
        $set: {
            ...params
        }
    })
    if (res.acknowledged === true) {
        info = utils.success("ok", "修改成功", 200)
    } else {
        info = utils.fail("修改失败", 40007, null)
    }
    ctx.body = info;
})

module.exports = router;