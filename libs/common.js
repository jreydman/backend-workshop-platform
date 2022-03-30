const {UserService} = require('../src/services')
const {UserDto} = require('../src/dtos')

module.exports = async(req,res,next)=> {
    res.locals.title='PASSPORT AUTHENTICATOR'
    res.locals.fullYear = (new Date()).getFullYear()
    res.locals.userProfile = ''
    if(req.session.userId) {
        const user = await UserService.getById(req.session.userId)
        res.locals.userProfile= new UserDto(user)
    }
    next()

}