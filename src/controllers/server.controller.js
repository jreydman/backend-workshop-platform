const genericCrud = require('./generic.controller')

const { ServerModel } = require('../models')
const boom = require("boom");

module.exports = {
    ... genericCrud(ServerModel),
    async getByName({ params: { name } }, res) {
        try {
            const item = await ServerModel.find({name: name})
            res.status(200).send(item)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}