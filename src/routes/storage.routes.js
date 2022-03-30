const router = require('express-promise-router')()

const { StorageController } = require('../controllers')

router.route('/:id').get(StorageController.get)
router.route('/').post(StorageController.create)
router.route('/').get(StorageController.getAll)
router.route('/:id').put(StorageController.update)
router.route('/:id').delete(StorageController.delete)

module.exports = router
