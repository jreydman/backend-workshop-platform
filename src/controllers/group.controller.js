const genericCrud = require('./generic.controller')

const { GroupModel, RuleModel} = require('../models')
const boom = require("boom");
const {GroupService} = require("../services");

module.exports = {
    async getByGroupname({ params: { groupname } }, res) {
        try {
            const group = await GroupService.getGroupByGroupname(groupname)
            res.status(200).send(group)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async getByRulename({ params: { rulename } }, res) {
        try {
            const groups = GroupService.getGroupByRulename()
            res.status(200).send(groups)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    ...genericCrud(GroupModel),
}