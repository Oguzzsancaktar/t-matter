const dataAccess = require('../../data-access')
const utils = require('../../utils/error-utils/errorUtils')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')

const getRole = async (req, res) => {
  const { id } = req.params
  try {
    const role = await dataAccess.roleDataAccess.findById(id)
    res.status(StatusCodes.OK).json(role)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRoles = async (req, res) => {
  try {
    const roles = await dataAccess.roleDataAccess.findRoles()
    res.status(StatusCodes.OK).json(roles)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const createRole = async (req, res) => {
  const { name } = req.body
  try {
    await dataAccess.roleDataAccess.createRole({ name })
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateRole = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.roleDataAccess.findByIdAndUpdate(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  getRoles,
  createRole,
  updateRole,
  getRole
}
