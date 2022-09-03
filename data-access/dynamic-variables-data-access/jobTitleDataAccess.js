const JobTitle = require('../../models/dynamic-variables/jobTitle')

// JobTitle
const createJobTitle = data => {
  return JobTitle.create(data)
}

const getJobTitles = ({ search, size, status }) => {
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

  return JobTitle.aggregate(pipeline).exec()
}

const findJobTitleById = (id, populate = '') => {
  return JobTitle.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateJobTitle = (id, data) => {
  return JobTitle.findByIdAndUpdate(id, data)
}

module.exports = {
  createJobTitle,
  getJobTitles,
  findJobTitleById,
  findByIdAndUpdateJobTitle
}
