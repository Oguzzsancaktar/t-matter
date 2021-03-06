const dataAccess = require('../../data-access')
const { StatusCodes } = require('http-status-codes')
const { STATUS_TYPES } = require('../../constants/constants')

// RelativeType
const createRelativeType = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.relativeTypeDataAccess.createRelativeType(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRelativeTypes = async (req, res) => {
  try {
    const checklists = await dataAccess.relativeTypeDataAccess.getRelativeTypes({}, '')
    res.status(StatusCodes.OK).json(checklists)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRelativeTypeById = async (req, res) => {
  const { id } = req.params
  try {
    const checklist = await dataAccess.relativeTypeDataAccess.findRelativeTypeById(id, '')
    res.status(StatusCodes.OK).json(checklist)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateRelativeType = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.relativeTypeDataAccess.findByIdAndUpdateRelativeType(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeRelativeType = async (req, res) => {
  const { id } = req.params
  try {
    await dataAccess.relativeTypeDataAccess.findByIdAndUpdateRelativeType(id, { status: STATUS_TYPES.INACTIVE })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

// RefferedBy
const createRefferedBy = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.refferedByDataAccess.createRefferedBy(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRefferedBys = async (req, res) => {
  try {
    const checklists = await dataAccess.refferedByDataAccess.getRefferedBys({}, '')
    res.status(StatusCodes.OK).json(checklists)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getRefferedByById = async (req, res) => {
  const { id } = req.params
  try {
    const checklist = await dataAccess.refferedByDataAccess.findRefferedByById(id, '')
    res.status(StatusCodes.OK).json(checklist)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateRefferedBy = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.refferedByDataAccess.findByIdAndUpdateRefferedBy(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeRefferedBy = async (req, res) => {
  const { id } = req.params
  try {
    await dataAccess.refferedByDataAccess.findByIdAndUpdateRefferedBy(id, { status: STATUS_TYPES.INACTIVE })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

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
  removeLocation,

  createRefferedBy,
  getRefferedBys,
  getRefferedByById,
  updateRefferedBy,
  removeRefferedBy,

  createRelativeType,
  getRelativeTypes,
  getRelativeTypeById,
  updateRelativeType,
  removeRelativeType
}
