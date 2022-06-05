const express = require('express')
const router = express.Router()

//ROUTES
const authRoutes = require('./auth-routes/authRoutes')
const salarySettingRoutes = require('./salary-setting-routes/salarySettingRoutes')
const companyPricingRoutes = require('./company-pricing-routes/companyPricingRoutes')
const roleRoutes = require('./role-routes/roleRoutes')
const userRoutes = require('./user-routes/userRoutes')

router.get('/hello', (req, res) => {
  res.send('hello')
})

router.use('/auth', authRoutes)
router.use('/salarySetting', salarySettingRoutes)
router.use('/companyPricing', companyPricingRoutes)
router.use('/role', roleRoutes)
router.use('/user', userRoutes)

module.exports = router
