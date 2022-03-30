const genericCrud = require('./generic.controller')

const { CategoryModel } = require('../models')
const boom = require("boom");

module.exports = {
    ... genericCrud(CategoryModel),
    async getByName({ params: { name } }, res) {
        try {
            const items = await CategoryModel.findOne({name: name})
            res.status(200).send(items)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}