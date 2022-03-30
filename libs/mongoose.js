const boom = require("boom");
const {mongoose} = require('./config')

const odmMongoose = require("mongoose");

odmMongoose.Promise=Promise

const mongooseLogs = (process.env.NODE_ENV==='development')
odmMongoose.set('debug',mongooseLogs)
//odmMongoose.set('useUnifiedTopology',true)

odmMongoose.connection.on('connected', () => {
  console.log("Mongo db connected");
});
odmMongoose.connection.on('error', (error) => {
  console.error(boom.boomify(error))
});

odmMongoose.connect(mongoose.url, mongoose.options);
module.exports=odmMongoose