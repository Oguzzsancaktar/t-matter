const Role = require('../../models/role')

const findRoles = (query = {}) => {
  return Role.find(query).sort({ createdAt: -1 }).lean().exec()
}

const findRoleWithFilters = ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }
  if (search) {
    match.$match.name = { $regex: search, $options: 'i' }
  }
  if (status && status !== '-9') {
    match.$match.status = { $eq: +status }
  }
  pipeline.push(match)
  pipeline.push({ $sort: { createdAt: -1 } })
  if (size) {
    pipeline.push({ $limit: +size })
  }
  return Role.aggregate(pipeline).exec()
}

const findByIdAndUpdate = (_id, data) => {
  return Role.findByIdAndUpdate(_id, data)
}

const findById = id => {
  return Role.findById(id).exec()
}

const createRole = data => {
  return Role.create(data)
}

module.exports = {
  findRoles,
  findByIdAndUpdate,
  findById,
  createRole,
  findRoleWithFilters
}
