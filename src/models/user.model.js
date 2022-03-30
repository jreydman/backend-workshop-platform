const {model, Schema, Schema: { Types: { ObjectId }} } = require("mongoose");
const bcryptjs = require("bcryptjs");
const { user, group, rule} = require("./models");

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  groups: [{
    type: ObjectId,
    ref: group
  }],
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
  activationLink: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model(user, schema);