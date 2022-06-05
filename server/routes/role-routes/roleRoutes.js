const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.post('/', middlewares.validations.roleValidations.createRoleValidation, controllers.roleController.createRole)

router.patch('/', middlewares.validations.roleValidations.updateRoleValidation, controllers.roleController.updateRole)

router.get('/:id', middlewares.validations.roleValidations.getRoleValidation, controllers.roleController.getRole)

router.get('/', controllers.roleController.getRoles)

module.exports = router
