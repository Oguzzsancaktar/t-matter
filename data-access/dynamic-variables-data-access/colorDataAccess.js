const Color = require('../../models/dynamic-variables/color')

// Color
const createColor = data => {
  return Color.create(data)
}

const getColors = ({ search, size, status }) => {
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

  return Color.aggregate(pipeline).exec()
}

const findColorById = (id, populate = '') => {
  return Color.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateColor = (id, data) => {
  return Color.findByIdAndUpdate(id, data)
}

module.exports = {
  createColor,
  getColors,
  findColorById,
  findByIdAndUpdateColor
}
