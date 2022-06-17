const WorkflowCategory = require('../../models/workflow-models/workflowCategory')
const WorkflowChecklist = require('../../models/workflow-models/workflowChecklist')

const createWorkflowCategory = data => {
  return WorkflowCategory.create(data)
}

const getWorkflowCategories = (query = {}, populate = '') => {
  return WorkflowCategory.find(query).populate(populate).lean().exec()
}

const findWorkflowCategoryById = (id, populate = '') => {
  return WorkflowCategory.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateWorkflowCategory = (id, data) => {
  return WorkflowCategory.findByIdAndUpdate(id, data)
}

const createWorkflowChecklist = data => {
  return WorkflowChecklist.create(data)
}

const getWorkflowChecklists = (query = {}, populate = '') => {
  return WorkflowChecklist.find(query).populate(populate).lean().exec()
}

module.exports = {
  createWorkflowCategory,
  getWorkflowCategories,
  findWorkflowCategoryById,
  findByIdAndUpdateWorkflowCategory,
  createWorkflowChecklist,
  getWorkflowChecklists
}
