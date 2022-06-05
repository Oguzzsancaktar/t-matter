const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post('/', middlewares.validations.userValidations.createUserValidation, controllers.userController.createUser)

router.patch('/', middlewares.validations.userValidations.updateUserValidation, controllers.userController.updateUser)

router.get('/:id', middlewares.validations.userValidations.getUserValidation, controllers.userController.getUsers)

router.delete(
  '/:id',
  middlewares.validations.userValidations.removeUserValidation,
  controllers.userController.removeUser
)

router.get('/', controllers.userController.getUser)

module.exports = router
