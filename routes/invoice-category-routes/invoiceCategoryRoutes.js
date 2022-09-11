const express = require('express')
const router = express.Router()
const controllers = require('../../controllers')
const multer = require('multer')
const path = require('path')

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (ext !== '.pdf') {
      cb(new Error('Unsupported file type!'), false)
      return
    }
    cb(null, true)
  }
})

router.get('/', controllers.invoiceCategoryController.getInvoiceCategoriesController)
router.get('/:_id', controllers.invoiceCategoryController.getInvoiceCategoryController)
router.post('/', controllers.invoiceCategoryController.createInvoiceCategoryController)
router.put('/:_id', controllers.invoiceCategoryController.updateInvoiceCategoryController)
router.post('/:_id/agreement', upload.single('file'), controllers.invoiceCategoryController.uploadPdfController)
module.exports = router
