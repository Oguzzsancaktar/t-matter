const express = require('express')
const router = express.Router()

//ROUTES
const authRoutes = require('./auth-routes/authRoutes')
const salarySettingRoutes = require('./salary-setting-routes/salarySettingRoutes')
const companyPricingRoutes = require('./company-pricing-routes/companyPricingRoutes')

router.get('/hello', (req, res) => {
  res.send('hello')
})

router.use('/auth', authRoutes)
router.use('/salarySetting', salarySettingRoutes)
router.use('/companyPricing', companyPricingRoutes)

module.exports = router
