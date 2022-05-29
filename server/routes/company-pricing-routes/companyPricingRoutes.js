const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.get('/', controllers.companyPricingController.getCompanyPricing)

router.patch(
  '/',
  middlewares.validations.companyPricingValidations.updateCompanyPricing,
  controllers.companyPricingController.updateCompanyPricing
)

router.post(
  '/',
  middlewares.validations.companyPricingValidations.createCompanyPricing,
  controllers.companyPricingController.createCompanyPricing
)

module.exports = router
