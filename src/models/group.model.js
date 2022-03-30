const {model, Schema, Schema: {Types: {ObjectId}}} = require("mongoose")
const {group, user, rule} = require('./models')

const schema = new Schema({
    groupname: {
        type: String,
        required: true,
        unique: true,
    },
    owner: {
        type: ObjectId,
        ref: user,
    },
    users: [{
        type: ObjectId,
        ref: user,
    }],
    rules: [{
        type: ObjectId,
        ref: rule,
    }],
    avatarUrl: {
        type: String,
        default: '',
    },
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

module.exports = model(group, schema);