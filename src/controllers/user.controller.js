const genericCrud = require('./generic.controller')
const passport = require("passport");
const {validationResult} = require('express-validator')
const { UserModel, RuleModel, GroupModel } = require('../models')
const boom = require("boom");
const bcrypt = require('bcrypt');
const ramda = require("ramda");
const {generateActivationLink} = require('../helpers')
const {UserService, TokenService} = require("../services");
const {UserDto} = require("../dtos");

module.exports = {
    ... genericCrud(UserModel),
    async getByUsername({ params: {username} },res) {
        try {
            const user = await UserService.getUserByUsername(username)
            return res.status(200).send(user)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async getByEmail({ params: {email} },res) {
        try {
            const user = await UserService.getUserByEmail(email)
            return res.status(200).send(user)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async getByRulename({ params: { rulename } }, res) {
        try {
            const users = await UserService.getUsersByRulename(rulename)
            return res.status(200).send(users)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async getByGroupname({ params: { groupname } }, res) {
        try {
            const users = await UserService.getByGroupname(groupname)
            return res.status(200).send(users)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async registration(req , res) {
        try {
            const validationErrors = validationResult(req)
            if(!validationErrors.isEmpty())
                return res.status(400).send(boom.badData('invalid credentials', validationErrors))

            const {username,email,password} = req.body
            const userData = await UserService.registration(username,email,password)

            res.cookie('refreshToken',userData.refreshToken, {maxAge: 30*24*3600*1000, httpOnly:true})
            return res.status(200).send(userData);
        } catch (err) {
            return res.status(400).send(boom.boomify(err));
        }
    },
    async authorization(req,res) {
        try{
            const {username, password} = req.body;
            const userData = await UserService.authorization(username,password)

            res.cookie('refreshToken',userData.refreshToken, {maxAge: 30*24*3600*1000, httpOnly:true})
            return res.status(200).send(userData);
        } catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async activate({params: {link}},res) {
        try{
            await UserService.activate(link)
            return res.redirect(process.env.CLIEND_URL)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async logout({cookies},res) {
        try{
            const {refreshToken} = cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).send(token)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async refreshToken({cookies},res) {
        try{
            const {refreshToken} = cookies
            const userData = await UserService.refreshToken(refreshToken)
            res.cookie('refreshToken',userData.refreshToken, {maxAge: 30*24*3600*1000, httpOnly:true})
            return res.status(200).send(userData);
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async refreshPassword(req,res) {
        try {
            const validationErrors = validationResult(req)
            if(!validationErrors.isEmpty())
                return res.status(400).send(boom.badData('invalid credentials', validationErrors))

            const {username,password,newPassword} = req.body
            const userData = await UserService.refreshPassword(username,password,newPassword)
            return res.status(200).send(userData);
        }
        catch(err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
}

//userController.get('/',passport.authenticate(process.env.AUTH_TYPE,{session:false}), async (req, res) => {
//     res.json({page:"account"})
// })