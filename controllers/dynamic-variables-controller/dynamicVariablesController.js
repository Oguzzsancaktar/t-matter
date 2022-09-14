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
  const { search, size, status } = req.query

  try {
    const checklists = await dataAccess.relativeTypeDataAccess.getRelativeTypes({ search, size, status })
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
  const { search, size, status } = req.query

  try {
    const checklists = await dataAccess.refferedByDataAccess.getRefferedBys({ search, size, status })
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
  const { search, size, status } = req.query

  try {
    const checklists = await dataAccess.locationDataAccess.getLocations({ search, size, status })
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

// JobTitle
const createJobTitle = async (req, res) => {
  const { body } = req
  try {
    await dataAccess.jobTitleDataAccess.createJobTitle(body)
    res.sendStatus(StatusCodes.CREATED)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getJobTitles = async (req, res) => {
  const { search, size, status } = req.query

  try {
    const checklists = await dataAccess.jobTitleDataAccess.getJobTitles({ search, size, status })
    res.status(StatusCodes.OK).json(checklists)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getJobTitleById = async (req, res) => {
  const { id } = req.params
  try {
    const checklist = await dataAccess.jobTitleDataAccess.findJobTitleById(id, '')
    res.status(StatusCodes.OK).json(checklist)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateJobTitle = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    await dataAccess.jobTitleDataAccess.findByIdAndUpdateJobTitle(_id ? _id : req.params.id, data)
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeJobTitle = async (req, res) => {
  const { id } = req.params
  try {
    await dataAccess.jobTitleDataAccess.findByIdAndUpdateJobTitle(id, { status: STATUS_TYPES.INACTIVE })
    res.sendStatus(StatusCodes.OK)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

// Color
const createColor = async (req, res) => {
  const { body } = req
  try {
    const createdColor = await dataAccess.colorDataAccess.createColor(body)
    res.status(StatusCodes.CREATED).send(createdColor)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getColors = async (req, res) => {
  const { search, size, status } = req.query

  try {
    const colors = await dataAccess.colorDataAccess.getColors({ search, size, status })
    res.status(StatusCodes.OK).json(colors)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getColorById = async (req, res) => {
  const { id } = req.params
  try {
    const color = await dataAccess.colorDataAccess.findColorById(id, '')
    res.status(StatusCodes.OK).json(color)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateColor = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    const updatedColor = await dataAccess.colorDataAccess.findByIdAndUpdateColor(_id ? _id : req.params.id, data)
    res.status(StatusCodes.OK).json(updatedColor)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeColor = async (req, res) => {
  const { id } = req.params
  try {
    const updatedColor = await dataAccess.colorDataAccess.findByIdAndUpdateJobTitle(id, {
      status: STATUS_TYPES.INACTIVE
    })
    res.status(StatusCodes.OK).json(updatedColor)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

// CustomerType
const createCustomerType = async (req, res) => {
  const { body } = req
  try {
    const createdCustomerType = await dataAccess.customerTypeDataAccess.createCustomerType(body)
    res.status(StatusCodes.CREATED).send(createdCustomerType)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getCustomerTypes = async (req, res) => {
  const { search, size, status } = req.query

  try {
    const customerTypes = await dataAccess.customerTypeDataAccess.getCustomerTypes({ search, size, status })
    res.status(StatusCodes.OK).json(customerTypes)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const getCustomerTypeById = async (req, res) => {
  const { id } = req.params
  try {
    const customerType = await dataAccess.customerTypeDataAccess.findCustomerTypeById(id, '')
    res.status(StatusCodes.OK).json(customerType)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const updateCustomerType = async (req, res) => {
  const { _id, ...data } = req.body
  try {
    const updatedCustomerType = await dataAccess.customerTypeDataAccess.findByIdAndUpdateCustomerType(
      _id ? _id : req.params.id,
      data
    )
    res.status(StatusCodes.OK).json(updatedCustomerType)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const removeCustomerType = async (req, res) => {
  const { id } = req.params
  try {
    const updatedCustomerType = await dataAccess.customerTypeDataAccess.findByIdAndUpdateJobTitle(id, {
      status: STATUS_TYPES.INACTIVE
    })
    res.status(StatusCodes.OK).json(updatedCustomerType)
  } catch (e) {
    console.log(e)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createJobTitle,
  getJobTitles,
  getJobTitleById,
  updateJobTitle,
  removeJobTitle,

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
  removeRelativeType,

  createCustomerType,
  getCustomerTypes,
  getCustomerTypeById,
  updateCustomerType,
  removeCustomerType,

  createColor,
  getColors,
  getColorById,
  updateColor,
  removeColor
}
