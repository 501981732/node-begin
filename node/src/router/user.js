const {SuccessModel,ErrorModel} = require('../model/responseModel')
const {login,register} = require('./../controller/login')
const { set_redis} = require('./../db/redis')
const userHandle = (req,res) => {
    const {method, url} = req
    const query = url.split('?')[1]
    const path = url.split('?')[0]
    if (method === 'POST' && path === '/api/user/login') {
        const {username, password} = req.body
        return login(username,password).then(data => {
            if (data.username) {
                //设置cookie 
                // res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${cookieExpires()}`)

                //设置session
                req.session.username = data.username
                req.session.realname = data.realname
                // 同步到 redis
                set_redis(req.sessionId, req.session)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }
    //登录测试
    // if (method === 'GET' && path === '/api/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session: req.session
    //             })
    //         )
    //     }
    //     return Promise.reject(
    //         new ErrorModel('尚未登录')
    //     )
    // }
    if (method === 'POST' && path === '/api/user/register') {
        const {username, password} = req.body
        return register(username,password).then(data => {
            if (data.id) {
                return new SuccessModel(data.msg)
            }
            return new ErrorModel(data.msg)

        })
    }  
}

module.exports = userHandle