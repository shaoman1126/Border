let router = require('koa-router')();
const log4js = require("../../utils/log4j");
const utils = require("../../utils/utils");
const Orders = require("../../models/orderSchema"); //商品信息模型
const Goods = require("../../models/goodsSchema"); //商品信息模型
const Commoditys = require("../../models/commoditySchema"); //商品信息模型





//添加订单
router.post("/v1/add/order", async (ctx, next) => {
    // chooseShop, orderAmount, dyOrderNumber, isGift
    const { phone, ...params } = ctx.request.body;
    let res, result, info, infos

    res = await Goods.findOne({ phone })

    // log4js.info(res)

    if (res) {

        info = await Orders.create({ phone: phone, ...params });

        infos = utils.success("ok", "操作成功", 200)
    } else {
        //这里没有数据要手动添加一个
        result = await Goods.create({
            name: "", // 姓名
            phone: phone, // 手机号
            address: "", //地址
            remark: "", //备注
        })
        // log4js.info(result);

        info = await Orders.create({ phone: phone, ...params });
        infos = utils.success("ok", "操作成功", 200)
    }
    ctx.body = infos;
});

//选择商品
router.get("/v1/choose/order", async (ctx, next) => {

    let res, info
    res = await Commoditys.find()

    res = res.filter((item, index) => {
        if (!item.ishide) return true
    })

    info = utils.success(res, "查询成功", 200)

    ctx.body = info
})



//订单列表
router.get("/v1/list/order", async (ctx, next) => {
    // log4js.info(ctx.query)
    let { phone, ...params } = ctx.request.query;
    let info, count
    let { page, skipIndex } = utils.pager(params);

    count = await Orders.find({}).count(); //查看全部数据

    if (phone) {
        //条件查询
        let data = await Orders.findOne({ phone }).skip(skipIndex).limit(page.pageSize)
        info = utils.success({
            list: [data] || [],
            count: count,
            ...page
        }, "获取数据成功", 200)
    } else {
        //查看全部
        // log4js.info(page)
        // log4js.info(skipIndex)
        let data = await Orders.find({}).skip(skipIndex).limit(page.pageSize)
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
router.get("/v1/echo/orders", async (ctx, next) => {
    let { _id } = ctx.request.query;
    let info
    if (_id) {
        let res = await Orders.findOne({ _id });
        log4js.info(res)
        info = utils.success(res, "操作成功", 200)
    } else {
        info = utils.fail("没有指定参数", 40005, null)
    }
    ctx.body = info;
})





//订单删除
router.post("/v1/delete/order", async (ctx, next) => {
    let info;
    let { _id } = ctx.request.body;
    let res = await Orders.deleteOne({ _id: _id })
    log4js.info(res)
    if (res.deletedCount === 1) {
        info = utils.success("ok", "删除成功", 200)
    } else {
        info = utils.success("ok", "已删除", 200)
    }
    ctx.body = info
})


//订单修改
router.post("/v1/edit/orders", async (ctx, next) => {
    let { _id, ...params } = ctx.request.body;

    let info
    let res = await Orders.updateOne({ _id: _id }, {
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