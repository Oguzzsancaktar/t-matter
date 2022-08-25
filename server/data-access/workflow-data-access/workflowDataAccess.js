const WorkflowCategory = require('../../models/workflow-models/workflowCategory')
const WorkflowChecklist = require('../../models/workflow-models/workflowChecklist')
const WorkflowPlan = require('../../models/workflow-models/workflowPlan')
const calculateHourlyCompanyFee = require('../../helpers/calculateHourlyCompanyFee')
const mongoose = require('mongoose')
const Location = require('../../models/dynamic-variables/location')
const User = require('../../models/user')

const createWorkflowCategory = data => {
  return WorkflowCategory.create(data)
}

const getWorkflowCategories = ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }

  if (search) {
    match.$match.name = { $regex: search, $options: 'i' }
  }

  if (status && status !== '-9') {
    match.$match.status = { $eq: +status }
  }

  pipeline.push(match)
  pipeline.push({ $sort: { createdAt: -1 } })
  if (size) {
    pipeline.push({ $limit: +size })
  }
  return WorkflowCategory.aggregate(pipeline).exec()
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

const getWorkflowChecklists = async ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }
  const { hourlyCompanyFee } = await calculateHourlyCompanyFee()

  if (search) {
    match.$match.name = { $regex: search, $options: 'i' }
  }

  if (status && status !== '-9') {
    match.$match.status = { $eq: +status }
  }

  pipeline.push(match)
  pipeline.push({ $sort: { createdAt: -1 } })

  pipeline.push({
    $addFields: {
      price: { $multiply: ['$duration', hourlyCompanyFee / 3600] }
    }
  })

  if (size) {
    pipeline.push({ $limit: +size })
  }

  return WorkflowChecklist.aggregate(pipeline)
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

const getWorkflowPlans = async ({ search, size, status }) => {
  const pipeline = []
  const match = { $match: {} }
  const { hourlyCompanyFee } = await calculateHourlyCompanyFee()

  if (search) {
    match.$match.name = { $regex: search, $options: 'i' }
  }

  if (status && status !== '-9') {
    match.$match.status = { $eq: +status }
  }

  pipeline.push(match)

  if (size) {
    pipeline.push({ $limit: +size })
  }

  const pipelineData = [
    {
      $unwind: {
        path: '$steps',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'workflowchecklists',
        localField: 'steps.checklistItems',
        foreignField: '_id',
        as: 'steps.checklistItems'
      }
    },
    {
      $lookup: {
        from: 'workflowcategories',
        localField: 'steps.category',
        foreignField: '_id',
        as: 'steps.category'
      }
    },
    {
      $unwind: {
        path: '$steps.category',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'locations',
        localField: 'steps.location',
        foreignField: '_id',
        as: 'steps.location'
      }
    },
    {
      $unwind: {
        path: '$steps.location',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'steps.responsibleUser',
        foreignField: '_id',
        as: 'steps.responsibleUser'
      }
    },
    {
      $unwind: {
        path: '$steps.responsibleUser',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$steps.checklistItems',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: '$steps._id',
        checklistTotalDuration: {
          $sum: '$steps.checklistItems.duration'
        },
        checklistItems: {
          $push: '$steps.checklistItems'
        },
        x: {
          $first: '$$ROOT'
        }
      }
    },
    {
      $project: {
        'steps.checklistItems': 0
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              _id: '$_id',
              checklistItems: '$checklistItems',
              checklistTotalDuration: '$checklistTotalDuration'
            },
            '$x'
          ]
        }
      }
    },
    {
      $addFields: {
        'steps.checklistItems': '$checklistItems'
      }
    },
    {
      $project: {
        checklistItems: 0
      }
    },
    {
      $group: {
        _id: '$_id',
        totalDuration: {
          $sum: '$checklistTotalDuration'
        },
        steps: {
          $push: '$steps'
        },
        x: {
          $first: '$$ROOT'
        }
      }
    },
    {
      $project: {
        'x.steps': 0,
        'x.checklistTotalDuration': 0
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              totalDuration: '$totalDuration',
              steps: '$steps'
            },
            '$x'
          ]
        }
      }
    },
    {
      $addFields: {
        totalPrice: {
          $multiply: ['$totalDuration', hourlyCompanyFee / 3600]
        }
      }
    },
    { $sort: { createdAt: -1 } }
  ]

  return WorkflowPlan.aggregate([...pipeline, ...pipelineData]).exec()
}

const findWorkflowPlanById = async (id, populate = 'steps.responsibleUser') => {
  const workflowPlan = await WorkflowPlan.findById(id).lean().exec()

  if (workflowPlan) {
    for (let x = 0; x < workflowPlan.steps.length; x++) {
      const step = workflowPlan.steps[x]
      const stepCategory = await WorkflowCategory.findById(step.category).lean().exec()
      const stepLocation = await Location.findById(step.location).lean().exec()
      const stepUser = await User.findById(step.responsibleUser).lean().exec()

      for (let i = 0; i < step.checklistItems.length; i++) {
        const checklistItemId = step.checklistItems[i]
        const checklistItem = await WorkflowChecklist.findById(checklistItemId).lean().exec()
        workflowPlan.steps[x].checklistItems[i] = checklistItem
      }

      workflowPlan.steps[x].category = stepCategory
      workflowPlan.steps[x].location = stepLocation
      workflowPlan.steps[x].responsibleUser = stepUser
    }
  }
  return workflowPlan
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
