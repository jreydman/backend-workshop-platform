const router = require('express-promise-router')()

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../data/swagger.json');


router.use('/', swaggerUi.serve);
router.route('/').get(swaggerUi.setup(swaggerDocument))

module.exports=router