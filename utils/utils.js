

/* 
    已经存在该数据 40004
    请填写必要的参数:40005
    没找到该数据:40006
    修改失败:40007
    添加失败:40008
    回显失败:40009
*/


const CODE = {
    SUCCESS: 200,
    PARAM_ERROR: 10001, // 参数错误
    USER_ACCOUNT_ERROR: 20001, //账号或密码错误
    USER_LOGIN_ERROR: 30001, // 用户未登录
    BUSINESS_ERROR: 40001, //业务请求失败
    AUTH_ERROR: 500001, // 认证失败或TOKEN过期
}

module.exports = {
    /*分页 */
    pager({ page = 1, pageSize = 10 }) {
        page = page * 1;
        pageSize = pageSize * 1;
        const skipIndex = (page - 1) * pageSize;
        return {
            page: {
                page,
                pageSize
            },
            skipIndex
        }
    },
    success(data = null, msg = "成功", code = CODE["SUCCESS"]) {
        return { data, msg, code }
    },
    fail(msg = "", code = CODE.BUSINESS_ERROR, data = null) {
        return { msg, code, data }
    },
    CODE
}