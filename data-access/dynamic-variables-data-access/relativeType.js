const RelativeType = require('../../models/dynamic-variables/relativeType')

// RelativeType
const createRelativeType = data => {
  return RelativeType.create(data)
}

const getRelativeTypes = ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }

  if (search && search !== 'undefined') {
    match.$match.$or = [
      {
        relateTo: { $regex: search, $options: 'i' }
      },

      { relateFrom: { $regex: search, $options: 'i' } }
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

  return RelativeType.aggregate(pipeline).exec()
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
