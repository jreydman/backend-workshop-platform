const {RuleModel, UserModel} = require("../models");
const boom = require("boom");
const UserService = require("./user.service")

module.exports = {
    async getByRulename(rulename) {
        return RuleModel.findOne({rulename: rulename})
    },
}