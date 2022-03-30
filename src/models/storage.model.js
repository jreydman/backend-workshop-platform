const {model, Schema, Schema: {Types: {ObjectId}}} = require("mongoose")
const {article, user, server, storage} = require('./models')

const schema = new Schema({
    slotToken: {
        type: String,
        unique: true,
    },
    itemCount:{
      type: Number,
    },
    slotCost: {
      type: Number,
    },
    chartFactor: {
        type: Number,
        default: 1,
    },
    articleItem: {
        type: ObjectId,
        ref: article
    },
    owner: {
        type: ObjectId,
        ref: user,
    },
    server: {
        type: ObjectId,
        ref:server,
    },
    admittedTimestamp: {
        type: Date,
        default: Date.now,
    },
    lastTrackedTimestamp: {
      type: Date,
        default: Date.now,
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

module.exports = model(storage, schema);