const genericCrud = require('./generic.controller')

const { ArticleModel } = require('../models')
const boom = require("boom");

module.exports = {
    ... genericCrud(ArticleModel),
    async getByProps({ params: { props } }, res) {
        try {
            const items = await ArticleModel.find({props: props})
            res.status(200).send(items)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}