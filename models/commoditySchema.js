let mongoose = require("mongoose");
let moment = require("moment");

let CommoditySchema = new mongoose.Schema({
    commodityName: String,
    commodityPrice: Number,
    ishide: {
        type: Boolean,
        default: false
    },
    created_time: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    seq: { type: Number, default: 0 }
});

module.exports = mongoose.model("commoditys", CommoditySchema, "commoditys") 