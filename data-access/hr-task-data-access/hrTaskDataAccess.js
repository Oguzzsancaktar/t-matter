const hrTask = require('../../models/hrTask')

const hrTaskCreate = data => {
  return hrTask.create(data)
}

const hrTaskFind = data => {
  return hrTask.find(data).populate('owner').sort({ startDate: -1 })
}

const hrTaskFindOne = data => {
  return hrTask.findOne(data)
}

const hrTaskFindByIdAndUpdate = (query, data) => {
  return hrTask.findByIdAndUpdate(query, data).exec()
}

module.exports = {
  hrTaskCreate,
  hrTaskFind,
  hrTaskFindOne,
  hrTaskFindByIdAndUpdate
}
