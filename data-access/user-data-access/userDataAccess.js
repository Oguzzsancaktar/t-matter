const User = require('../../models/user')
const { STATUS_TYPES } = require('../../constants/constants')

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
    match.$match.$or = [
      { firstname: { $regex: search, $options: 'i' } },
      { lastname: { $regex: search, $options: 'i' } },
      // TODO: add role regex search
      { role: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ]
  }
  if (status && status !== '-9') {
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

const findActiveUsersAndPopulateSalarySetting = () => {
  return User.aggregate([
    { $match: { status: { $eq: STATUS_TYPES.ACTIVE } } },
    { $lookup: { from: 'salarysettings', localField: '_id', foreignField: 'owner', as: 'salarySetting' } }
  ]).exec()
}

const findOnlineUsers = () => {
  return User.find({ isOnline: true }).select('_id').lean().exec()
}

module.exports = {
  createUser,
  findByIdAndUpdateUser,
  findUserById,
  findUser,
  findUserWithFiltersAndPopulate,
  findActiveUsersAndPopulateSalarySetting,
  findOnlineUsers
}
