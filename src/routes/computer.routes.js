const router = require('express-promise-router')()

const { ComputerController } = require('../controllers')

router.route('/:id').get(ComputerController.get)
router.route('/token/:token').get(ComputerController.getByToken)
router.route('/').post(ComputerController.create)
router.route('/').get(ComputerController.getAll)
router.route('/:id').put(ComputerController.update)
router.route('/:id').delete(ComputerController.delete)

module.exports = router
