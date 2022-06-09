const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')

const createUser = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.userDataAccess.createUser(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateUser = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.userDataAccess.findByIdAndUpdateUser(_id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await dataAccess.userDataAccess.findUserById(id)
    let workingSchedule = await dataAccess.workingScheduleDataAccess.findWorkingScheduleByUserId(id)
    if (!workingSchedule) {
      workingSchedule = await dataAccess.workingScheduleDataAccess.findCompanyWorkingSchedule()
    }
    res.status(StatusCodes.OK).json({ ...user, workingSchedule })
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
