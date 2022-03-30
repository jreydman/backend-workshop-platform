const {generateValidations} = require('./index')

const refreshPasswordOptions = {
    username: {
        required: true
    },
    password: {
        required: true
    },
    newPassword: {
        length: {
            min: 8,
            max: 32,
        },
        required: true
    },
}

module.exports=generateValidations(refreshPasswordOptions)