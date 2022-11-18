const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares')
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
const financeRoutes = require('./finance-routes/financeRoutes')
const invoiceCategoryRoutes = require('./invoice-category-routes/invoiceCategoryRoutes')
const companyRoutes = require('./company-routes/companyRoutes')
const historyRoutes = require('./history-routes/historyRoutes')
const hrSettingRoutes = require('./hr-setting-routes/hrSettingRoutes')

const websiteSettingRoutes = require('./website-settings-routes/websiteSettingRoutes')

const customerWorkActivityRoutes = require('./customer-work-activity-routes/customerWorkActivityRoutes')
const customerHistoryRoutes = require('./history-routes/customerHistoryRoutes')
const hrTaskRoutes = require('./hr-task-routes/hrTaskRoutes')

router.get('/hello', (req, res) => {
  res.send('hello')
})

router.use('/auth', authRoutes)
router.use('/salarySetting', salarySettingRoutes)
router.use('/companyPricing', companyPricingRoutes)
router.use('/company', companyRoutes)
router.use('/role', roleRoutes)
router.use('/user', userRoutes)
router.use('/customer', customerRoutes)
router.use('/time-log', timeLogRoutes)
router.use('/workflow', workflowRoutes)
router.use('/working-schedule', workingScheduleRoutes)
router.use('/dynamic-variables', dynamicVariableRoutes)
router.use('/task', taskRoutes)
router.use('/activity', activityRoutes)
router.use('/finance', middlewares.authMiddlewares.checkAuth, financeRoutes)
router.use('/invoice-category', invoiceCategoryRoutes)
router.use('/history/customer', customerHistoryRoutes)
router.use('/history', middlewares.authMiddlewares.checkAuth, historyRoutes)
router.use('/hr-setting', middlewares.authMiddlewares.checkAuth, hrSettingRoutes)
router.use('/customer-work-activity', customerWorkActivityRoutes)
<<<<<<< HEAD
router.use('/website-settings', websiteSettingRoutes)
=======
router.use('/hr-task', middlewares.authMiddlewares.checkAuth, hrTaskRoutes)
>>>>>>> refs/remotes/origin/master

module.exports = router
