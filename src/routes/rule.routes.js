const router = require('express-promise-router')()

const { RuleController} = require('../controllers')

router.route('/:id').get(RuleController.get)
router.route('/').post(RuleController.create)
router.route('/').get(RuleController.getAll)
router.route('/:id').put(RuleController.update)
router.route('/:id').delete(RuleController.delete)
router.route('/rulename/:rulename').get(RuleController.getByRulename)

module.exports = router
