const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

const upload = require('../../utils/upload-utils/multer')

router.post(
  '/',
  middlewares.validations.customerValidations.createCustomerValidation,
  controllers.customerController.createCustomer
)

router.post('/checkin', upload.none(), controllers.customerController.checkInCreateContactAndRelateNewConsultationTask)

router.put(
  '/',
  middlewares.validations.customerValidations.updateCustomerValidation,
  controllers.customerController.updateCustomer
)

router.get(
  '/:id',
  middlewares.validations.customerValidations.getCustomerValidation,
  controllers.customerController.getCustomer
)

router.patch(
  '/:id/status',
  middlewares.validations.customerValidations.statusUpdateCustomerValidation,
  controllers.customerController.updateCustomer
)

router.get(
  '/reliables/:id',
  middlewares.validations.customerValidations.getCustomerValidation,
  controllers.customerController.getCustomerReliablesWithId
)

router.get('/', controllers.customerController.getCustomers)
router.get('/phone/:phone', controllers.customerController.getCustomerByPhone)

router.post('/image/:id', upload.single('file'), controllers.customerController.addOrChangeCustomerProfileImage)

module.exports = router
