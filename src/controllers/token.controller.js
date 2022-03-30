const genericCrud = require('./generic.controller')

const { TokenModel } = require('../models')
const boom = require("boom");

module.exports = {
    ... genericCrud(TokenModel),
    async refreshToken(req,res) {
        try{
            res.status(200).send({page:'refresh'})
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}