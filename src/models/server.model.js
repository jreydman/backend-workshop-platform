const {model, Schema, Schema: {Types: {ObjectId}}} = require("mongoose")
const {server, group, computer, storage} = require('./models')

const schema = new Schema({
    servername: {
        type: String,
        required: true,
        unique: true,
    },
    computer: [{
        type: ObjectId,
        ref: computer,
    }],
    storageItem: [{
        type: ObjectId,
        ref: storage,
    }],
    avatarUrl: {
        type: String,
        default: ''
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

module.exports = model(server, schema);