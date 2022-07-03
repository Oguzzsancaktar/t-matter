const Location = require('../../models/dynamic-variables/location')
const RefferedBy = require('../../models/dynamic-variables/refferedBy')

// RefferedBy
const createRefferedBy = data => {
  return RefferedBy.create(data)
}

const getRefferedBys = (query = {}, populate = '') => {
  return RefferedBy.find(query).populate(populate).lean().exec()
}

const findRefferedByById = (id, populate = '') => {
  return RefferedBy.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateRefferedBy = (id, data) => {
  return RefferedBy.findByIdAndUpdate(id, data)
}

module.exports = {
  createRefferedBy,
  getRefferedBys,
  findRefferedByById,
  findByIdAndUpdateRefferedBy
}
