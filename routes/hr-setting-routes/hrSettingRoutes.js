const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.get('/', controllers.hrSettingController.getUserHrSetting)

router.post('/', controllers.hrSettingController.updateUserHrSetting)

module.exports = router
