const ActiveTask = require('../../models/activeTask')

const addActiveTask = async ({ task, user, activeTaskStep }) => {
  const activeTask = await getActiveTask({ task, user })
  if (activeTask) {
    return ActiveTask.findOneAndUpdate({ task, user }, { activeTaskStep })
  }
  return ActiveTask.create({ task, user, activeTaskStep })
}

const removeActiveTask = async ({ task, user }) => {
  return ActiveTask.findOneAndDelete({ task, user })
}

const removeUserActiveTasks = async ({ user }) => {
  return ActiveTask.deleteMany({ user })
}

const getActiveTasks = async () => {
  return ActiveTask.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: {
        path: '$user',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'tasks',
        localField: 'task',
        foreignField: '_id',
        as: 'task'
      }
    },
    {
      $unwind: {
        path: '$task',
        preserveNullAndEmptyArrays: true
      }
    }
  ]).exec()
}

const getActiveTask = ({ task, user }) => {
  return ActiveTask.findOne({ task, user })
}

module.exports = { addActiveTask, removeActiveTask, getActiveTasks, getActiveTask, removeUserActiveTasks }
