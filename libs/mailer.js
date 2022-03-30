const nodemailer = require('nodemailer')
const {mailer} = require('./config')

module.exports = function() {
    return nodemailer.createTransport({
        host: mailer.host,
        port: mailer.port,
        secure: false,
        auth: {
            user: mailer.user,
            pass: mailer.password,
        }
    })
}