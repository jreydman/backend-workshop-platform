const genericCrud = require('./generic.controller')

const { StorageModel } = require('../models')
const boom = require("boom");

module.exports = {
    ... genericCrud(StorageModel),
    async getByToken({ params: { token } }, res) {
        try {
            const items = await StorageModel.find({slotToken: token})
            res.status(200).send(items)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}