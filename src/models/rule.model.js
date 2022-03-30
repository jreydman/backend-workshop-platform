const {model, Schema, Schema: {Types: {ObjectId}}} = require("mongoose")
const {group, rule} = require('./models')

const schema = new Schema({
    rulename: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Number,
        default: process.env.STATUS_NON_ENABLED,
    },
    reasonDescription: {
        type: String,
        default: ''
    },
});

module.exports = model(rule, schema);