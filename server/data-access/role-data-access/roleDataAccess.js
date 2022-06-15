const Role = require('../../models/role')

const findRoles = () => {
  return Role.find().sort({ createdAt: -1 }).lean().exec()
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
  createRole
}
