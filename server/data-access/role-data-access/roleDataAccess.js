const Role = require('../../models/role')

const findRoles = () => {
  return Role.find().lean().exec()
}

const findByIdAndUpdate = (id, data) => {
  return Role.findByIdAndUpdate(id, data)
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
