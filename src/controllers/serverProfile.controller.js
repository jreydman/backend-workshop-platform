const genericCrud = require('./generic.controller')
const {ServerProfileModel} = require("../models");
const boom = require("boom")
const {ServerProfileService, UserService} = require("../services");
module.exports = {
    ...genericCrud(ServerProfileModel),
    async tester({params:{id}},res) {
        try{
            const user = await UserService.getById(id)
            const data = await ServerProfileService.refreshUserProfiles(user)
            res.status(200).send(data)
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}