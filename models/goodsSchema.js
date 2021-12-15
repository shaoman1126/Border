let mongoose = require("mongoose")
let moment = require("moment")
let goodSchema = new mongoose.Schema({
    name: String, // 姓名
    phone: String, // 手机号
    address: String, //地址
    remark: String, //备注
    created_time: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    seq: { type: Number, default: 0 }
});

module.exports = mongoose.model("goods", goodSchema, "goods") 