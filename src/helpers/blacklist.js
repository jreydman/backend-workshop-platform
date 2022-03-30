const ramda = require('ramda')

const blacklist = ['password', 'status', 'reasonDescription',]

module.exports.blAdapter = function (local=[]) {
    this.blacklist = ramda.concat(blacklist,local)
    this.queryChecker = (query) => {
        const keys = Object.keys(query)
        return this.blacklist.some(r=> keys.indexOf(r) >= 0)
    }
    this.keyChecker = (key) => {
        return this.blacklist.some(r=> r===key)
    }
}