const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

// Locations
router.post(
  '/location',
  middlewares.validations.dynamicVariableValidations.createLocationValidation,
  controllers.dynamicVariableController.createLocation
)

router.get('/location', controllers.dynamicVariableController.getLocations)
router.get('/location/:id', controllers.dynamicVariableController.getLocationById)

router.patch(
  '/location/:id',
  middlewares.validations.dynamicVariableValidations.updateLocationValidation,
  controllers.dynamicVariableController.updateLocation
)

router.patch(
  '/location/:id/status',
  middlewares.validations.generalValidations.statusUpdateValidation,
  controllers.dynamicVariableController.updateLocation
)

module.exports = router
