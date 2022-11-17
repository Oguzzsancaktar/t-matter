const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')
const utils = require('../../utils')
const cloudinary = require('../../utils/upload-utils/cloudinary')

const createUser = async (req, res) => {
  const { body } = req
  try {
    body.password = await utils.authUtils.hashPassword({ plainTextPassword: body.password })
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
    await dataAccess.userDataAccess.findByIdAndUpdateUser(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await dataAccess.userDataAccess.findUserById(id, 'role')
    let workingSchedule = await dataAccess.workingScheduleDataAccess.findWorkingScheduleByUserIdOrDefault(id)
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
  const { search, size, status } = req.query
  try {
    const users = await dataAccess.userDataAccess.findUserWithFiltersAndPopulate({ search, size, status })
    res.status(StatusCodes.OK).json(users)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const addOrChangeUserProfileImage = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    var result

    if (user) {
      if (req.body.file) {
        result = await cloudinary.uploader.upload(req.body.file)
      } else {
        result = await cloudinary.uploader.upload(req.file.path)
      }

      user.cloudinary_id = result.public_id
      user.profile_img = result.secure_url

      const updatedUser = await dataAccess.userDataAccess.findByIdAndUpdateUser(id, user)

      res.status(200).send(updatedUser)
    } else {
      res.status(404).send('Customer not found!!')
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createUser,
  getUsers,
  removeUser,
  getUser,
  updateUser,
  addOrChangeUserProfileImage
}
