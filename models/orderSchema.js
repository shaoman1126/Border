// let mongoose = require("mongoose")
// let moment = require("moment");


// //主表
// let orderSchema = new mongoose.Schema({
//     phone: {
//         type: String,
//         required: true
//     },
//     chooseShop: [{
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: "OrderItem",
//     }],
//     orderAmount: {
//         type: Number,
//         required: true
//     },
//     dyOrderNumber: {
//         type: Number,
//         required: true
//     },
//     isGift: {
//         type: Boolean,
//         default: false
//     },
//     created_time: {
//         type: String,
//         default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
//     },
//     seq: { type: Number, default: 0 }
// });


// //副表
// let ordersItemSchema = new mongoose.Schema({
//     productName: {
//         type: String,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     }
// })


// module.exports = {
//     Orders: mongoose.model("orders", orderSchema, "orders"),
//     OrdersItem: mongoose.model("OrdersItem", ordersItemSchema, "OrdersItem"),
// }




let mongoose = require("mongoose")
let moment = require("moment");


//主表
let orderSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    chooseShop: [
        {
            productName: String,
            productCount: Number,
        }
    ],
    orderAmount: {
        type: Number,
        required: true
    },
    dyOrderNumber: {
        type: Number,
        required: true
    },
    isGift: {
        type: Boolean,
        default: false
    },
    created_time: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    seq: { type: Number, default: 0 }
});




module.exports = mongoose.model("orders", orderSchema, "orders")