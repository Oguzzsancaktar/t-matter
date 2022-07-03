const RelativeType = require('../../models/dynamic-variables/relativeType')

// RelativeType
const createRelativeType = data => {
  return RelativeType.create(data)
}

const getRelativeTypes = (query = {}, populate = '') => {
  return RelativeType.find(query).populate(populate).lean().exec()
}

const findRelativeTypeById = (id, populate = '') => {
  return RelativeType.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateRelativeType = (id, data) => {
  return RelativeType.findByIdAndUpdate(id, data)
}

module.exports = {
  createRelativeType,
  getRelativeTypes,
  findRelativeTypeById,
  findByIdAndUpdateRelativeType
}
