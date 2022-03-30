const boom = require("boom");
const { UserModel, RuleModel, GroupModel } = require('../models')
const RuleService = require('./rule.service')

module.exports = {
    async getGroupByGroupname(groupname) {
        return GroupModel.findOne({groupname: groupname})
    },
    async getGroups(id) {
      return GroupModel.find({_id:id})
    },
    async getGroupByRulename(rulename) {
        const rule = await RuleService.getByRulename(rulename)
        return GroupModel.find({rules: rule})
    }
}