const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.get('/', controllers.companyPricingController.getCompanyPricing)

router.get('/summary', controllers.companyPricingController.getCompanySummary)

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
