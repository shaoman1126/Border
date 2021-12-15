let router = require('koa-router')();
const log4js = require("../../utils/log4j");
const utils = require("../../utils/utils");
const Goods = require("../../models/goodsSchema"); //商品信息模型



//添加商品
router.post("/v1/add/goods", async (ctx, next) => {
    let data = ctx.request.body;
    // log4js.info(data)
    const { name, phone, address, remark } = data;
    let info

    if (name && phone && address) {
        const res = await Goods.findOne({ phone })
        // log4js.info(res)
        if (res) {
            info = utils.success(null, "已经存在该数据", 40004)
        } else {
            const res = await Goods.create(data)

            info = utils.success("ok", "添加成功", 200)
        }
    } else {
        info = utils.fail(null, "请输入必须填写的信息", 400013)
    }
    ctx.body = info;
})


//商品列表
router.get("/v1/list/goods", async (ctx, next) => {
    // log4js.info(ctx.query)
    let { phone, ...params } = ctx.request.query;
    let info, count
    let { page, skipIndex } = utils.pager(params);

    count = await Goods.find({}).count(); //查看全部数据

    if (phone) {
        //条件查询
        let data = await Goods.findOne({ phone }).skip(skipIndex).limit(page.pageSize)
        info = utils.success({
            list: [data] || [],
            count: count,
            ...page
        }, "获取数据成功", 200)
    } else {
        //查看全部
        // log4js.info(page)
        // log4js.info(skipIndex)
        let data = await Goods.find({}).skip(skipIndex).limit(page.pageSize)
        // log4js.info(data)
        info = utils.success({
            list: data || [],
            count: count,
            ...page
        }, "获取数据成功", 200)
    }
    ctx.body = info;
    // log4js.info(ctx.querystring)
    // let data = await Goods.find({});
    // log4js.info(data)
    // ctx.body = data;
    // utils.success()
});



//回显
router.get("/v1/echo/goods", async (ctx, next) => {
    let { _id } = ctx.request.query;
    let info
    if (_id) {
        let res = await Goods.findOne({ _id });
        log4js.info(res)
        info = utils.success(res, "操作成功", 200)
    } else {
        info = utils.fail("请输入正确用户名和密码", 40005, null)
    }
    ctx.body = info;
})


//修改
router.post("/v1/edit/goods", async (ctx, next) => {
    let { _id, ...params } = ctx.request.body;

    let info
    let res = await Goods.updateOne({ _id: _id }, {
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



router.post("/v1/delete/goods", async (ctx, next) => {
    let info;
    let { _id } = ctx.request.body;
    let res = await Goods.deleteOne({ _id: _id })
    log4js.info(res)
    if (res.deletedCount === 1) {
        info = utils.success("ok", "删除成功", 200)
    } else {
        info = utils.success("ok", "已删除", 200)
    }
    ctx.body = info
})





module.exports = router;