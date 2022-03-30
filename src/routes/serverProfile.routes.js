const router = require('express-promise-router')()

const { ServerProfileController } = require('../controllers')

router.route('/:id').get(ServerProfileController.get)
router.route('/').post(ServerProfileController.create)
router.route('/').get(ServerProfileController.getAll)
router.route('/:id').put(ServerProfileController.update)
router.route('/:id').delete(ServerProfileController.delete)
router.route('/tester/:id').get(ServerProfileController.tester)

module.exports = router
