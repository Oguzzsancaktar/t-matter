const dataAccess = require('../data-access')

class ActiveTaskStepHandler {
  /*
  * activeTaskSteps = {
      task: ICustomerTask
      user: IUser
      activeTaskStep: number
    }[]
  * */
  io = null
  socket = null
  room = null

  constructor(io) {
    this.io = io
  }

  setSocket(socket) {
    this.socket = socket
    this.room = socket.handshake.query.organization
  }

  setTaskStep = ({ taskId, data }) => {
    return dataAccess.activeTaskDataAccess.addActiveTask({
      user: this.socket.handshake.query.userId,
      task: taskId,
      activeTaskStep: data.activeTaskStep
    })
  }

  getActiveTaskStep = ({ taskId }) => {
    return dataAccess.activeTaskDataAccess.getActiveTasks({ task: taskId, user: this.socket.handshake.query.userId })
  }

  emitActiveTaskSteps = async () => {
    const activeTasks = await dataAccess.activeTaskDataAccess.getActiveTasks()
    this.io.in(this.room).emit('activeTaskSteps', activeTasks)
  }

  addActiveTaskStep = async data => {
    await this.setTaskStep({ taskId: data.task._id, data })
    await this.emitActiveTaskSteps()
  }

  removeActiveTaskStep = async ({ taskId }) => {
    await dataAccess.activeTaskDataAccess.removeActiveTask({ task: taskId, user: this.socket.handshake.query.userId })
    await this.emitActiveTaskSteps()
  }

  taskStepChange = async ({ taskId, activeTaskStep }) => {
    let data = await this.getActiveTaskStep({ taskId })
    if (!data) {
      return
    }
    data.activeTaskStep = activeTaskStep
    await this.setTaskStep({ taskId, data })
    await this.emitActiveTaskSteps()
  }

  updateTaskWorkedTime = async ({ taskId, workedTime }) => {
    let [data] = await this.getActiveTaskStep({ taskId })
    if (!data) {
      return
    }
    data.workedTime = workedTime
    await this.setTaskStep({ taskId, data })
    await this.emitActiveTaskSteps()
  }

  removeAllUserActiveTaskSteps = async () => {
    await dataAccess.activeTaskDataAccess.removeUserActiveTasks({ user: this.socket.handshake.query.userId })
    await this.emitActiveTaskSteps()
  }
}

module.exports = ActiveTaskStepHandler
