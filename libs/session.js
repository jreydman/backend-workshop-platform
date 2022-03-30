const mongoose = require('./mongoose')
const MongoStore = require('connect-mongo')

const sessionStore = MongoStore.create({mongoUrl: mongoose.connection})

module.exports=sessionStore