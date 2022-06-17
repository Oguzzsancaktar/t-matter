const User = require('../../models/user')

const createUser = data => {
  return User.create(data)
}

const findByIdAndUpdateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data)
}

const findUserById = (id, populate = '') => {
  return User.findById(id).populate(populate).lean().exec()
}

const findUser = (query = {}, populate = '') => {
  return User.find(query).populate(populate).sort({ createdAt: -1 }).lean().exec()
}

const findUserWithFiltersAndPopulate = ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }
  if (search) {
    match.$match.firstname = { $regex: search, $options: 'i' }
  }
  if (status) {
    match.$match.status = { $eq: +status }
  }
  pipeline.push(match)
  pipeline.push({
    $lookup: {
      from: 'roles',
      localField: 'role',
      foreignField: '_id',
      as: 'role'
    }
  })
  pipeline.push({ $sort: { createdAt: -1 } })
  if (size) {
    pipeline.push({ $limit: +size })
  }
  return User.aggregate(pipeline).exec()
}

module.exports = {
  createUser,
  findByIdAndUpdateUser,
  findUserById,
  findUser,
  findUserWithFiltersAndPopulate
}
