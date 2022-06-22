const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')

// Location
const createLocation = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.locationDataAccess.createLocation(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getLocations = async (req, res) => {
  try {
    const checklists = await dataAccess.locationDataAccess.getLocations({}, '')
    res.status(StatusCodes.OK).json(checklists)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getLocationById = async (req, res) => {
  const { id } = req.params
  try {
    const checklist = await dataAccess.locationDataAccess.findLocationById(id, '')
    res.status(StatusCodes.OK).json(checklist)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateLocation = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.locationDataAccess.findByIdAndUpdateLocation(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeLocation = async (req, res) => {
  const { id } = req.params
  try {
    await dataAccess.locationDataAccess.findByIdAndUpdateLocation(id, { status: STATUS_TYPES.INACTIVE })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  removeLocation
}
