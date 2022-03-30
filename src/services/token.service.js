const jwt = require("jsonwebtoken");
const {TokenModel} = require('../models')
const {authenticate} = require('../../libs/config')
module.exports = {
    async getByRefreshToken(token) {
      return TokenModel.findOne({refreshToken: token});
    },
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload,authenticate.jwt.accessSecret,{expiresIn: authenticate.jwt.accessTime})
        const refreshToken = jwt.sign(payload,authenticate.jwt.refreshSecret,{expiresIn: authenticate.jwt.refreshTime})
        return { accessToken, refreshToken }
    },
    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = new TokenModel({user: userId, refreshToken: refreshToken})
        return token.save()
    },
    async removeToken(refreshToken) {
        return TokenModel.deleteOne({refreshToken:refreshToken})
    },
    async validateAccessToken(token) {
        try {
            return jwt.verify(token, authenticate.jwt.accessSecret)
        } catch (e) {return null}
    },
    async validateRefreshToken(token) {
        try {
            return jwt.verify(token, authenticate.jwt.refreshSecret)
        } catch (e) {return null}
    },
}