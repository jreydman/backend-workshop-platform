const genericCrud = require('./generic.controller')

const { ComputerModel } = require('../models')
const boom = require("boom");

module.exports = {
    ... genericCrud(ComputerModel),
    async getByToken({ params: { token } }, res) {
        try {
            const item = await ComputerModel.findOne({token: token})
            res.status(200).send(item)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}