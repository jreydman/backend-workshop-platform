const router = require('express-promise-router')()

const { ArticleController} = require('../controllers')

module.exports = (passport) => {
    router.route('/:id').get(ArticleController.get)
    router.route('/props/:props').get(ArticleController.getByProps)

    router.route('/').post(ArticleController.create)
    router.route('/').get(passport.authenticate('jwt', { session: false }),ArticleController.getAll)
    router.route('/:id').put(ArticleController.update)
    router.route('/:id').delete(ArticleController.delete)
    return router
}

