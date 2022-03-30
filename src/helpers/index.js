const regular = require('regular');
const {check} = require("express-validator");
const ramda = require("ramda");
const jwt = require("jsonwebtoken")
const uuid = require("uuid")

function textExpression(value) {
    return true
}

function emailExpression(value) {
    return regular.email.test(value)
}

function telExpression(value) {
    return true
}

function passwordExpression(value) {
    return /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\\]).{8,32}/.test(value)
}

function typeSwitcher(type,value) {
    if (type === 'text') {return textExpression(value) }
    else if (type === 'email') {return emailExpression(value)}
    else if (type === 'tel') {return telExpression(value)}
    else if (type === 'password') {return passwordExpression(value)}
    else { return true }
}

function requiredExpression(optionValue, fieldName) {
    if(optionValue) return check(fieldName,`field ${fieldName} should be not empty`).notEmpty()
    return false
}

function lengthExpression(optionValue, fieldName) {
    if(optionValue) return check(fieldName,`field ${fieldName} should be in [${optionValue.min} : ${optionValue.max}] length`)
        .isLength({min:optionValue.min,max:optionValue.max})
}

function isEmailExpression(optionValue, fieldName) {
    if(optionValue) return check(fieldName,'field email should be seams type').isEmail()
}

function isPasswordExpression(optionValue, fieldName) {
    if(optionValue) return check(fieldName, `field ${fieldName} should be of password expression`).isStrongPassword()
}

function optionSwitcher(optionKey,optionValue,fieldName) {
    if (optionKey === 'required') {return requiredExpression(optionValue,fieldName) }
    else if (optionKey === 'length') {return lengthExpression(optionValue,fieldName)}
    else if (optionKey === 'isEmail') {return isEmailExpression(optionValue,fieldName)}
    else if (optionKey === 'isPassword') {return isPasswordExpression(optionValue,fieldName)}
    else { return true }
}

module.exports.generateValidations = function(options) {
    let validations = []

    ramda.forEachObjIndexed((filedOption,fieldName)=>{
        ramda.forEachObjIndexed((optionValue,optionKey)=>{
            const validator = optionSwitcher(optionKey,optionValue,fieldName)
            if(validator) validations = ramda.append(validator,validations)
        },filedOption)
    },options)

    return validations
}

module.exports.generateActivationLink = () => uuid.v4()