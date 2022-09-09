const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')
const upload = require('../../utils/upload-utils/multer')

router.post('/', middlewares.validations.userValidations.createUserValidation, controllers.userController.createUser)

router.patch('/', middlewares.validations.userValidations.updateUserValidation, controllers.userController.updateUser)

router.get('/:id', middlewares.validations.userValidations.getUserValidation, controllers.userController.getUser)

router.patch(
  '/:id/status',
  middlewares.validations.userValidations.statusUpdateUserValidation,
  controllers.userController.updateUser
)

router.get('/', controllers.userController.getUsers)

router.post('/image/:id', upload.single('file'), controllers.userController.addOrChangeUserProfileImage)

module.exports = router
