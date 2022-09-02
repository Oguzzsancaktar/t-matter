const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

// RelativeType
router.post(
  '/relative-type',
  middlewares.validations.dynamicVariableValidations.createRelativeTypeValidation,
  controllers.dynamicVariableController.createRelativeType
)

router.get('/relative-type', controllers.dynamicVariableController.getRelativeTypes)
router.get('/relative-type/:id', controllers.dynamicVariableController.getRelativeTypeById)

router.patch(
  '/relative-type/:id',
  middlewares.validations.dynamicVariableValidations.updateRelativeTypeValidation,
  controllers.dynamicVariableController.updateRelativeType
)

router.patch(
  '/relative-type/:id/status',
  middlewares.validations.generalValidations.statusUpdateValidation,
  controllers.dynamicVariableController.updateRelativeType
)

// Reffered By
router.post(
  '/reffered-by',
  middlewares.validations.dynamicVariableValidations.createRefferedByValidation,
  controllers.dynamicVariableController.createRefferedBy
)

router.get('/reffered-by', controllers.dynamicVariableController.getRefferedBys)
router.get('/reffered-by/:id', controllers.dynamicVariableController.getRefferedByById)

router.patch(
  '/reffered-by/:id',
  middlewares.validations.dynamicVariableValidations.updateRefferedByValidation,
  controllers.dynamicVariableController.updateRefferedBy
)

router.patch(
  '/reffered-by/:id/status',
  middlewares.validations.generalValidations.statusUpdateValidation,
  controllers.dynamicVariableController.updateRefferedBy
)

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
