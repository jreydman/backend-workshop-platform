const router = require('express-promise-router')()

const { GroupController } = require('../controllers')

router.route('/:id').get(GroupController.get)
router.route('/group/:groupname').get(GroupController.getByGroupname)
router.route('/rule/:rulename').get(GroupController.getByRulename)
router.route('/').post(GroupController.create)
router.route('/').get(GroupController.getAll)
router.route('/:id').put(GroupController.update)
router.route('/:id').delete(GroupController.delete)
router.route('/get/q').get(GroupController.queryArgs)
router.route('/get').post(GroupController.bodyArgs)

module.exports = router
