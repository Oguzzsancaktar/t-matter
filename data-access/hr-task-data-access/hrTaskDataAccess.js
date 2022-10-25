const hrTask = require('../../models/hrTask')

const hrTaskCreate = data => {
  return hrTask.create(data)
}

const hrTaskFind = data => {
  return hrTask.find(data)
}

const hrTaskFindOne = data => {
  return hrTask.findOne(data)
}

module.exports = {
  hrTaskCreate,
  hrTaskFind,
  hrTaskFindOne
}
