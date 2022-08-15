const Location = require('../../models/dynamic-variables/location')

// Location
const createLocation = data => {
  return Location.create(data)
}

const getLocations = ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }

  if (search && search !== 'undefined') {
    match.$match.$or = [
      {
        name: { $regex: search, $options: 'i' }
      }
    ]
  }

  if (status && status !== '-9') {
    match.$match.status = { $eq: +status }
  }

  pipeline.push(match)
  pipeline.push({ $sort: { createdAt: -1 } })

  if (size) {
    pipeline.push({ $limit: +size })
  }

  return Location.aggregate(pipeline).exec()
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
