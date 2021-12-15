let mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    username: String, // 用户名
    password: String, // 密码
});

module.exports = mongoose.model("users", userSchema)