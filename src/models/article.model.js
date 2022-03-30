const {model, Schema, Schema: {Types: {ObjectId}}} = require("mongoose")
const {article, category} = require('./models')

const schema = new Schema({
    props: {
        type: String,
    },
    dmg: {
        type: String,
    },
    max: {
        type: Number,
    },
    nbt: {
        type: String,
        unique: true,
    },
    cost: {
        type: Number,
        default: 0,
    },
    category: {
      type: ObjectId,
      ref: category,
    },
    chartFactor: {
        type: Number,
        default: 1,
    },
    propsUrl: {
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
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model(article, schema);