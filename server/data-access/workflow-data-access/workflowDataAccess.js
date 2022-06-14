const WorkflowCategory = require('../../models/workflow-models/workflowCategory')

const createWorkflowCategory = data => {
  return WorkflowCategory.create(data)
}

const getWorkflowCategories = (query = {}, populate = '') => {
  return WorkflowCategory.find(query).populate(populate).lean().exec()
}
module.exports = {
  createWorkflowCategory,
  getWorkflowCategories
}
