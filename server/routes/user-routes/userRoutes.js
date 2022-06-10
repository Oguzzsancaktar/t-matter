const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post('/', middlewares.validations.userValidations.createUserValidation, controllers.userController.createUser)

router.patch('/', middlewares.validations.userValidations.updateUserValidation, controllers.userController.updateUser)

router.get('/:id', middlewares.validations.userValidations.getUserValidation, controllers.userController.getUser)

router.patch(
  '/:id/status',
  middlewares.validations.userValidations.statusUpdateUserValidation,
  controllers.userController.updateUser
)

router.get('/', controllers.userController.getUsers)

module.exports = router
