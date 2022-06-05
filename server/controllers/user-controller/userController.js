const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')

const createUser = async (req, res) => {
  try {
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateUser = async (req, res) => {
  try {
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = dataAccess.userDataAccess.findUserById(id)
    res.status(StatusCodes.OK).json(user)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeUser = async (req, res) => {
  const { id } = req.params
  try {
    await dataAccess.userDataAccess.findByIdAndUpdateUser(id, { status: STATUS_TYPES.INACTIVE })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await dataAccess.userDataAccess.findUser()
    res.status(StatusCodes.OK).json(users)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createUser,
  getUsers,
  removeUser,
  getUser,
  updateUser
}
