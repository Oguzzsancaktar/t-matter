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

const findWorkflowChecklistById = async (id, populate = '') => {
  const checklist = await WorkflowChecklist.findById(id).populate(populate).lean().exec()
  const { hourlyCompanyFee } = await calculateHourlyCompanyFee()
  checklist.price = (checklist.duration * hourlyCompanyFee) / 3600
  return checklist
}

const findByIdAndUpdateWorkflowChecklist = (id, data) => {
  return WorkflowChecklist.findByIdAndUpdate(id, data)
}

// Plan
const createWorkflowPlan = data => {
  return WorkflowPlan.create(data)
}

const getWorkflowPlans = async (query = {}, populate = '') => {
  const workflowPlans = await WorkflowPlan.find(query).sort({ createdAt: -1 }).populate(populate).lean().exec()
  const { hourlyCompanyFee } = await calculateHourlyCompanyFee()

  if (workflowPlans) {
    for (let x = 0; x < workflowPlans.length; x++) {
      const workflowPlan = workflowPlans[x]
      workflowPlans[x].price = 0
      for(let i = 0; i < workflowPlan.steps.length; i++) {
        const steps = workflowPlan.steps[i]
        for (let y = 0; y < steps.checklistItems.length; y++) {
          const checklistItem = steps.checklistItems[y]
          workflowPlans[x].steps[i].checklistItems[y] = await WorkflowChecklist.findById(checklistItem).lean().exec()
          workflowPlans[x].price += (workflowPlans[x].steps[i].checklistItems[y].duration / 3600) * hourlyCompanyFee
        }
      }
    }
  }
  return workflowPlans
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
