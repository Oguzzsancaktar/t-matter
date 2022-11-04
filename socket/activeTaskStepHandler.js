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
    return dataAccess.userDataAccess.setActiveTaskStep({
      _id: this.socket.handshake.query.userId,
      taskId,
      activeTaskStep: data.activeTaskStep
    })
  }

  getActiveTaskStep = async ({ taskId }) => {
    return await this.redisClient.get(`task_${this.socket.handshake.query.userId}_${taskId}`)
  }

  emitActiveTaskSteps = async () => {
    // emit all active task steps
    // this.io.in(this.room).emit('activeTaskSteps', activeTaskStepValues)
  }

  addActiveTaskStep = async data => {
    await this.setTaskStep({ taskId: data.task._id, data })
    await this.emitActiveTaskSteps()
  }

  removeActiveTaskStep = async ({ taskId }) => {
    await dataAccess.userDataAccess.removeActiveTaskStep({ _id: this.socket.handshake.query.userId, taskId })
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
    let data = await this.getActiveTaskStep({ taskId })
    if (!data) {
      return
    }
    data.workedTime = workedTime
    await this.setTaskStep({ taskId, data })
    await this.emitActiveTaskSteps()
  }

  removeAllUserActiveTaskSteps = async () => {
    await this.redisClient.del(`task_${this.socket.handshake.query.userId}_*`)
    await this.emitActiveTaskSteps()
  }
}

module.exports = ActiveTaskStepHandler
