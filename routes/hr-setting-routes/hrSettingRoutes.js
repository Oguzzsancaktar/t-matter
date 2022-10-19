const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')

router.get('/:userId', controllers.hrSettingController.getUserHrSetting)

router.post('/:userId', controllers.hrSettingController.updateUserHrSetting)

module.exports = router
