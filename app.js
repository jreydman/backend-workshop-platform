require("dotenv").config()

// INJECTS ....................................
const express         = require("express")
const http            = require("http")
const path            = require("path")
const createError     = require("http-errors")
const logger          = require("morgan")
const cookieParser    = require("cookie-parser")
const cors            = require("cors")
const bodyParser      = require("body-parser")
const passport        = require("passport")
const session         = require('express-session')
const colors          = require("colors")
const boom            = require("boom");

const router          = require("./libs/router")
const config          = require('./libs/config')

const app = express()

// COMPONENTS .................................
app
  .use(logger("dev"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(cors())

// SESSION ...................................
//const sessionStore = require('./libs/session')
app.use(session({
  secret: config.session.secret,
  key: config.session.key,
  cookie: config.session.cookie,
  //store: require('./libs/mongoose'),
  resave:false,
  saveUninitialized: true,
}))

// PASSPORT ..................................
require('./libs/passport')(passport)

app.use(passport.initialize())
app.use(passport.session())

// ROUTER ....................................
require('./libs/router')(app,passport)

// TEMPLATES ..................................
app
  .set("view engine", config.templater.engine)
  .set("view", path.join(__dirname, config.templater.path.view))
  .use(express.static(path.resolve(__dirname, config.templater.path.static)));

// MIDDLEWARES ................................

/* 404 HANDLER */
app.use((req, res, next) => {
  next(createError(404));
});
// .............................................

async function start() {
  try {
    // DATABASE ................................
    require('./libs/mongoose')

    // LISTENER ................................
    http.createServer({},app).listen(config.port)
    console.log(`Server listen from PORT = ${config.port}`)
  } catch(error) {
    console.error(boom.boomify(error))
  }
}

start()