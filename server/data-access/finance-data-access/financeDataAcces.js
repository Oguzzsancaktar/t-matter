const FinancePlanning = require('../../models/financePlanning')

const createFinancePlanning = data => {
  return FinancePlanning.create(data)
}

const updateFinancePlanning = data => {
  return FinancePlanning.findOneAndUpdate({}, data)
}

const getFinancePlanning = () => {
  return FinancePlanning.findOne({})
}

module.exports = {
  updateFinancePlanning,
  getFinancePlanning,
  createFinancePlanning
}
