const {model, Schema, Schema: {Types: {ObjectId}}} = require("mongoose")
const {server, storage, user, rule, serverProfile} = require('./models')

const schema = new Schema({
    user: {
        type: ObjectId,
        ref: user,
        required: true,
    },
    server: {
        type: ObjectId,
        ref: server,
        required: true,
    },
    storageCart: [{
        type: ObjectId,
        ref: storage,
    }],
    money: {
        type: Number,
        default: 0,
    },
    rules: [{
        type: ObjectId,
        ref: rule,
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

module.exports = model(serverProfile, schema);