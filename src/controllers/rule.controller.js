const genericCrud = require('./generic.controller')

const {RuleService} = require('../services')
const {RuleModel} = require('../models')
const boom = require("boom");

module.exports = {
    ... genericCrud(RuleModel),
    async getByRulename({ params: { rulename } }, res) {
        try {
            const rule = await RuleService.getByRulename(rulename)
            res.status(200).send(rule)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async getAllByUserId({params: { id }},res) {
        try {
            const rules = await RuleService.getAllByUserId(id)
            res.status(200).send(rules)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
}