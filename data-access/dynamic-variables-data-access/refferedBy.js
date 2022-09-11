const RefferedBy = require('../../models/dynamic-variables/refferedBy')

// RefferedBy
const createRefferedBy = data => {
  return RefferedBy.create(data)
}

const pipelineLookupColor = [
  {
    $lookup: {
      from: 'colors',
      localField: 'color',
      foreignField: '_id',
      as: 'color'
    }
  },
  {
    $unwind: {
      path: '$color',
      preserveNullAndEmptyArrays: true
    }
  }
]

const getRefferedBys = ({ search, size, status }) => {
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

  pipeline.push(...pipelineLookupColor)

  pipeline.push(match)
  pipeline.push({ $sort: { createdAt: -1 } })

  if (size) {
    pipeline.push({ $limit: +size })
  }

  return RefferedBy.aggregate(pipeline).exec()
}

const findRefferedByById = (id, populate = '') => {
  return RefferedBy.findById(id).populate('color').lean().exec()
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
