const {generateValidations} = require('./index')

const registrationOptions = {
    username: {
        length: {
            min: 8,
            max: 16,
        },
        required: true
    },
    email: {
        isEmail: true,
        required: true
    },
    password: {
        length: {
            min: 8,
            max: 32,
        },
        required: true
    },
}

module.exports=generateValidations(registrationOptions)