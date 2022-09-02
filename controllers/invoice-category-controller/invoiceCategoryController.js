const dataAccess = require('../../data-access')
const { INTERNAL_SERVER_ERROR } = require('http-status-codes')

const getInvoiceCategoryController = async (req, res) => {
  try {
    const invoiceCategory = await dataAccess.invoiceCategoryDataAccess.getInvoiceCategory(req.params._id)
    res.send(invoiceCategory)
  } catch (error) {
    console.log(error)
    res.sendStatus(INTERNAL_SERVER_ERROR)
  }
}

const getInvoiceCategoriesController = async (req, res) => {
  try {
    const invoiceCategories = await dataAccess.invoiceCategoryDataAccess.getInvoiceCategories({ ...req.query })
    res.send(invoiceCategories)
  } catch (error) {
    console.log(error)
    res.sendStatus(INTERNAL_SERVER_ERROR)
  }
}

const createInvoiceCategoryController = async (req, res) => {
  try {
    const invoiceCategory = await dataAccess.invoiceCategoryDataAccess.createInvoiceCategory(req.body)
    res.send(invoiceCategory)
  } catch (error) {
    console.log(error)
    res.sendStatus(INTERNAL_SERVER_ERROR)
  }
}

const updateInvoiceCategoryController = async (req, res) => {
  try {
    const invoiceCategory = await dataAccess.invoiceCategoryDataAccess.updateInvoiceCategory({
      id: req.params._id,
      data: req.body
    })
    res.send(invoiceCategory)
  } catch (error) {
    console.log(error)
    res.sendStatus(INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  getInvoiceCategoryController,
  getInvoiceCategoriesController,
  updateInvoiceCategoryController,
  createInvoiceCategoryController
}
