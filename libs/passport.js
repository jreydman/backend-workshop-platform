//const {UserModel} = require("../src/models");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const {authenticate} = require('./config')
const {UserService} = require("../src/services");
const boom = require("boom")
const {UserDto} = require("../src/dtos");

async function authenticator(jwt_payload,done) {
    try{
        const user = await UserService.getById(jwt_payload.id)
        if(!user) return done(null,false)
        const userData = new UserDto(user)
        return done(null,userData)

    } catch(err) {
        return done(err,false)
    }
}

module.exports = (passport) => {

  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = authenticate.jwt.accessSecret;


  passport.use(new JwtStrategy(opts,authenticator))

}