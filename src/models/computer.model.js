const {model, Schema, Schema: {Types: {ObjectId}}} = require("mongoose")
const {computer, group, server} = require('./models')


const schema = new Schema({
    token: {
        type: String,
        unique: true,
    },
    server: {
      type: ObjectId,
      ref: server,
    },
    group: [{
        type: ObjectId,
        ref: group,
    }],
    status: {
        type: Number,
        default: process.env.STATUS_NON_ENABLED,
    },
    reasonDescription: {
        type: String,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model(computer, schema);