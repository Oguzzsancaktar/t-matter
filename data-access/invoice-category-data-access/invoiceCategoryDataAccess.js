const InvoiceCategory = require('../../models/invoiceCategory')

const getInvoiceCategories = ({ status, search, size }) => {
  const query = {}
  if (status !== '-9') {
    query.status = +status
  }
  if (search) {
    query.name = { $regex: search, $options: 'i' }
  }
  const pipeline = [
    {
      $match: query
    }
  ]
  if (size) {
    pipeline.push({
      $limit: size
    })
  }
  return InvoiceCategory.aggregate(pipeline).exec()
}

const createInvoiceCategory = data => {
  return InvoiceCategory.create(data)
}

const updateInvoiceCategory = ({ id, data }) => {
  return InvoiceCategory.findByIdAndUpdate(id, { ...data }, { new: true })
    .lean()
    .exec()
}

const getInvoiceCategory = id => {
  return InvoiceCategory.findById(id).lean().exec()
}

module.exports = {
  getInvoiceCategories,
  createInvoiceCategory,
  getInvoiceCategory,
  updateInvoiceCategory
}
