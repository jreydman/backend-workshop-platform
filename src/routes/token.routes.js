const router = require('express-promise-router')()
const {check} = require("express-validator")
const registrationValidators = require('../helpers/registration.validator')
const { TokenController } = require('../controllers')

router.route('/:id').get(TokenController.get)
router.route('/').post(TokenController.create)
router.route('/').get(TokenController.getAll)
router.route('/:id').put(TokenController.update)
router.route('/:id').delete(TokenController.delete)


module.exports = router
