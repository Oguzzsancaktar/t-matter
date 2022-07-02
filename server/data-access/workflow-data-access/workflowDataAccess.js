const WorkflowCategory = require('../../models/workflow-models/workflowCategory')
const WorkflowChecklist = require('../../models/workflow-models/workflowChecklist')
const WorkflowPlan = require('../../models/workflow-models/workflowPlan')
const calculateHourlyCompanyFee = require('../../helpers/calculateHourlyCompanyFee')

const createWorkflowCategory = data => {
  return WorkflowCategory.create(data)
}

const getWorkflowCategories = (query = {}, populate = '') => {
  return WorkflowCategory.find(query).sort({ createdAt: -1 }).populate(populate).lean().exec()
}

const findWorkflowCategoryById = (id, populate = '') => {
  return WorkflowCategory.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateWorkflowCategory = (id, data) => {
  return WorkflowCategory.findByIdAndUpdate(id, data)
}

// Checklist
const createWorkflowChecklist = data => {
  return WorkflowChecklist.create(data)
}

const getWorkflowChecklists = async (query = {}, populate = '') => {
  const { hourlyCompanyFee } = await calculateHourlyCompanyFee()
  return WorkflowChecklist.aggregate([
    { $match: query },
    {
      $addFields: {
        price: { $multiply: ['$duration', hourlyCompanyFee / 3600] }
      }
    },
    { $sort: { createdAt: -1 } }
  ])
}

const findWorkflowChecklistById = (id, populate = '') => {
  return WorkflowChecklist.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateWorkflowChecklist = (id, data) => {
  return WorkflowChecklist.findByIdAndUpdate(id, data)
}

// Plan
const createWorkflowPlan = data => {
  return WorkflowPlan.create(data)
}

const getWorkflowPlans = (query = {}, populate = '') => {
  return WorkflowPlan.find(query).sort({ createdAt: -1 }).populate(populate).lean().exec()
}

const findWorkflowPlanById = (id, populate = '') => {
  return WorkflowPlan.findById(id).populate(populate).lean().exec()
}

const findByIdAndUpdateWorkflowPlan = (id, data) => {
  return WorkflowPlan.findByIdAndUpdate(id, data)
}

module.exports = {
  createWorkflowCategory,
  getWorkflowCategories,
  findWorkflowCategoryById,
  findByIdAndUpdateWorkflowCategory,

  createWorkflowChecklist,
  getWorkflowChecklists,
  findWorkflowChecklistById,
  findByIdAndUpdateWorkflowChecklist,

  createWorkflowPlan,
  getWorkflowPlans,
  findWorkflowPlanById,
  findByIdAndUpdateWorkflowPlan
}
