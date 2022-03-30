const {ServerProfileCrud} = require('./cruds')
//const {ServerService} = require('./index')
const ramda = require("ramda")
const {ServerModel, ServerProfileModel} = require("../models");
module.exports = {
    ...ServerProfileCrud,
    async refreshUserProfiles(user) {
        const servers = await ServerModel.find()
        let profiles=[]
        await Promise.all(servers.map(async (server) => {
            let profile =  await ServerProfileModel.findOne({user,server})
            if(!profile) {
                profile = new ServerProfileModel({
                    user: user._id,
                    server: server._id
                })
                profiles.push(profile)
                await profile.save()
            } else profiles.push(profile)

        }));

        return profiles
    },
}