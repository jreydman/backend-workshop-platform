const boom = require("boom");
const { UserModel, RuleModel, GroupModel } = require('../models')

const { UserCrud, GroupCrud } = require('./cruds')
const bcrypt = require("bcrypt");
const {generateActivationLink} = require("../helpers");
const MailService = require('./mail.service')
const TokenService = require('./token.service')
const GroupService = require("./group.service");
const RuleService = require("./rule.service");
const ramda = require("ramda");
const {UserDto} = require('../dtos')
const ServerProfileService = require('./serverProfile.service')

module.exports = {
    ...UserCrud,
    async getById(id) {
      return UserModel.findById(id)
    },
    async getUserByUsername(username) {
        return UserModel.findOne({username: username})
    },
    async getUserByEmail(email) {
        return UserModel.findOne({email: email})
    },
    async getUsersByRulename(rulename) {
        const rule = await RuleService.getByRulename(rulename)
        return UserModel.find({rules: rule})
    },
    async getByGroupname(groupname) {
        const group = await GroupService.getGroupByGroupname(groupname)
        return UserModel.find({groups: group})
    },
    async getRulesByUser(user) {
        let userRules = user.rules
        const groups = await GroupService.getGroups(user.groups)
        ramda.forEach(({rules}) => {
            ramda.forEach(rule=>{
                if(!ramda.includes(rule,userRules))  userRules = ramda.append(rule,userRules)
            },rules)
        },groups)
        return userRules
    },
    async getRulesById(id) {
        const user = await UserModel.findById(id)
        if(!user) throw boom.badData('user not found',id)
        return UserService.getRulesByUser(user)
    },
    async registration(username,email,password) {
        let candidate = await UserModel.findOne({username: username})
        if (candidate) throw boom.notAcceptable('username is already registered', username)
        candidate = await UserModel.findOne({email: email})
        if (candidate) throw boom.notAcceptable('email is already registered', email)

        const hashPassword = bcrypt.hashSync(password, 10);
        const ruleUser = await RuleModel.findOne({rulename: 'ROLE_USER'})
        const groupUser = await GroupModel.findOne({groupname: 'users'})

        const activationCode = generateActivationLink()

        const newUser = new UserModel({
            username: username,
            email: email,
            password: hashPassword,
            rules: [ruleUser._id],
            groups: [groupUser._id],
            activationLink: activationCode,
        })
        await newUser.save()
        const userDto = new UserDto(newUser)

        const tokens = await TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        await MailService.sendActivationLink(email, `${process.env.SERVER_URL}/user/activate/${activationCode}`)
        return {user: userDto, ...tokens}
    },
    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink:activationLink})
        if(!user) throw boom.badData('invalid activation link',activationLink)
        if(user.status.toString()!==process.env.STATUS_NON_ENABLED)
            throw boom.badData(`user is already activated`)
        user.status = process.env.STATUS_ENABLED
        delete user.activationLink
        await user.save()
        await ServerProfileService.refreshUserProfiles(user)
    },
    async authorization(username,password) {
        const user = await UserModel.findOne({username: username})
        if(!user) throw boom.notAcceptable('no user with that username found')
        const validPassword = bcrypt.compareSync(password,user.password)
        if(!validPassword) throw boom.notAcceptable('Invalid password')
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {user: userDto, ...tokens}
    },
    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken)
    },
    async refreshToken(refreshToken) {
        if(!refreshToken) throw boom.unauthorized()
        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokenData = await TokenService.getByRefreshToken(refreshToken)
        if(!userData||!tokenData) throw boom.unauthorized()

        const newUser = await UserModel.findById(userData.id)
        const userDto = new UserDto(newUser)
        const tokens = await TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {user:userDto, ...tokens}
    },
    async refreshPassword(username,password,newPassword) {
        const user = await UserModel.findOne({username: username})
        if(!user) throw boom.notAcceptable('no user with that username found')
        const validPassword = bcrypt.compareSync(password,user.password)
        if(!validPassword) throw boom.notAcceptable('Invalid password')
        user.password = bcrypt.hashSync(newPassword, 10)
        return user.save()
    }
}