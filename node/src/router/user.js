const {SuccessModel,ErrorModel} = require('../model/responseModel')
const {login} = require('./../controller/login')
const userHandle = (req,res) => {
    const {method, url} = req
    const query = url.split('?')[1]
    const path = url.split('?')[0]
    if (method === 'POST' && path === '/api/login') {
        const {username, password} = req.body
        let result = login(username,password)
        if (result) {
            return new SuccessModel(result,'登录成功')
        } else {
            return new ErrorModel(result,'登录失败')
        }
    }
}

module.exports = userHandle