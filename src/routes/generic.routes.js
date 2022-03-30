const {GenericController} = require("../controllers");
const router = require('express-promise-router')()

router.route('/test').get(GenericController().test)

module.exports = router