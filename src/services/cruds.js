const base = require('./crud.service')
const {UserModel, GroupModel, TokenModel, ServerProfileModel, ServerModel} = require("../models");
module.exports = {
    UserCrud: base(UserModel),
    GroupCrud: base(GroupModel),
    TokenCrud: base(TokenModel),
    ServerCrud: base(ServerModel),
    ServerProfileCrud: base(ServerProfileModel),
}