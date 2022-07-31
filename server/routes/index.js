const express = require('express')
const router = express.Router()

//ROUTES
const authRoutes = require('./auth-routes/authRoutes')
const salarySettingRoutes = require('./salary-setting-routes/salarySettingRoutes')
const companyPricingRoutes = require('./company-pricing-routes/companyPricingRoutes')
const roleRoutes = require('./role-routes/roleRoutes')
const userRoutes = require('./user-routes/userRoutes')
const customerRoutes = require('./customer-routes/customerRoutes')
const workflowRoutes = require('./workflow-routes/workflowRoutes')
const dynamicVariableRoutes = require('./dynamic-variable-routes/dynamicVariableRoutes')
const timeLogRoutes = require('./time-log-routes/timeLogRoutes')
const workingScheduleRoutes = require('./working-schedule-routes/workingScheduleRoutes')
const taskRoutes = require('./task-routes/taskRoutes')
const activityRoutes = require('./activity-routes/activityRoutes')

router.get('/hello', (req, res) => {
  res.send('hello')
})

router.use('/auth', authRoutes)
router.use('/salarySetting', salarySettingRoutes)
router.use('/companyPricing', companyPricingRoutes)
router.use('/role', roleRoutes)
router.use('/user', userRoutes)
router.use('/customer', customerRoutes)
router.use('/time-log', timeLogRoutes)
router.use('/workflow', workflowRoutes)
router.use('/working-schedule', workingScheduleRoutes)
router.use('/dynamic-variables', dynamicVariableRoutes)
router.use('/task', taskRoutes)
router.use('/activity', activityRoutes)

module.exports = router
