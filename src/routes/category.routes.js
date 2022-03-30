const router = require('express-promise-router')()

const { CategoryController} = require('../controllers')

router.route('/:id').get(CategoryController.get)
router.route('/name/:name').get(CategoryController.getByName)
router.route('/').post(CategoryController.create)
router.route('/').get(CategoryController.getAll)
router.route('/:id').put(CategoryController.update)
router.route('/:id').delete(CategoryController.delete)

module.exports = router
