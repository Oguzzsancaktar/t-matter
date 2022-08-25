const express = require('express')
const router = express.Router()
const controllers = require('../../controllers')

router.get('/', controllers.invoiceCategoryController.getInvoiceCategoriesController)
router.get('/:_id', controllers.invoiceCategoryController.getInvoiceCategoryController)
router.post('/', controllers.invoiceCategoryController.createInvoiceCategoryController)
router.put('/:_id', controllers.invoiceCategoryController.updateInvoiceCategoryController)

module.exports = router
