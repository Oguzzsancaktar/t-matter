const Location = require('../../models/dynamic-variables/location')
const RefferedBy = require('../../models/dynamic-variables/refferedBy')

// Location
const createLocation = data => {
  return Location.create(data)
}

const getLocations = (query = {}, populate = '') => {
  return Location.find(query).populate(populate).lean().exec()
}

const findLocationById = (id, populate = '') => {
  return Location.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateLocation = (id, data) => {
  return Location.findByIdAndUpdate(id, data)
}

module.exports = {
  createLocation,
  getLocations,
  findLocationById,
  findByIdAndUpdateLocation
}
