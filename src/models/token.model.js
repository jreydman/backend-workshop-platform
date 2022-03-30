const {model, Schema, Schema: { Types: { ObjectId }} } = require("mongoose");
const { user, group, rule, token} = require("./models");

const schema = new Schema({
    user: {
        type: ObjectId,
        ref: user,
    },
    refreshToken: {
        type: String,
        required: true,
    },
});

module.exports = model(token, schema);