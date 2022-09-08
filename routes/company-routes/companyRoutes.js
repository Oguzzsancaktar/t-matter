const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const controllers = require('../../controllers')
const upload = require('../../utils/upload-utils/multer')

router.put('/', controllers.companyController.updateCompanyInfo)
router.get('/', controllers.companyController.getCompanyInfo)
router.post('/logo', upload.single('logo'), controllers.companyController.uploadCompanyLogo)
module.exports = router
