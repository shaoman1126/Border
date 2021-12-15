let mongoose = require("mongoose");
let mongodbURL = require("./index")
const utils = require("../utils/log4j");
mongoose.connect(mongodbURL.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", () => {
    utils.error("***数据库连接失败***")
})

db.on("open", () => {
    utils.info("***数据库连接成功***")
})