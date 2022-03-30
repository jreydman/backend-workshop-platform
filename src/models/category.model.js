const {model, Schema, Schema: {Types: {ObjectId}}} = require("mongoose")
const {article, category} = require('./models')

const schema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
        default: ''
    },
    articles: [{
            type: ObjectId,
            ref: article,
    }],
    status: {
        type: Number,
        default: process.env.STATUS_NON_ENABLED,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model(category, schema);