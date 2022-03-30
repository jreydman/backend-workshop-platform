const boom = require("boom");
const Mailer = require('../../libs/mailer')
const hbs = require('nodemailer-express-handlebars')
const {mailer} = require('../../libs/config')
const transporter = new Mailer()

module.exports = {
    async send(email,subject,html) {
        await transporter.sendMail({
            from: mailer.user,
            to: email,
            subject: subject,
            text: '',
            html: html,
        })
    },
    async sendActivationLink(email, activationLink) {
        const body =
                `
                 <div>
                    <h1>ACTIVATION LINK: </h1>
                    <a href="${activationLink}">${activationLink}</a>
                 </div>
                `
        await this.send(email,'WORKSHOP[aw] | Account activation link', body)
    },
}