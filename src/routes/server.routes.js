const router = require('express-promise-router')()

const { ServerController } = require('../controllers')

router.route('/:id').get(ServerController.get)
router.route('/name/:name').get(ServerController.getByName)
router.route('/').post(ServerController.create)
router.route('/').get(ServerController.getAll)
router.route('/:id').put(ServerController.update)
router.route('/:id').delete(ServerController.delete)

module.exports = router
