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
  redisClient = null

  constructor(io, redisClient) {
    this.io = io
    this.redisClient = redisClient
  }

  setSocket(socket) {
    this.socket = socket
    this.room = socket.handshake.query.organization
  }

  setTaskStep = ({ taskId, data }) => {
    return this.redisClient.set(`task_${this.socket.handshake.query.userId}_${taskId}`, JSON.stringify(data), {
      ex: 180
    })
  }

  getActiveTaskStep = async ({ taskId }) => {
    return await this.redisClient.get(`task_${this.socket.handshake.query.userId}_${taskId}`)
  }

  emitActiveTaskSteps = async () => {
    let activeTaskStepKeys = await this.redisClient.keys(`task_*`)
    let activeTaskStepValues = []
    if (activeTaskStepKeys.length > 0) {
      activeTaskStepValues = await this.redisClient.mget(...activeTaskStepKeys)
    }
    this.io.in(this.room).emit('activeTaskSteps', activeTaskStepValues)
  }

  addActiveTaskStep = async data => {
    await this.setTaskStep({ taskId: data.task._id, data })
    await this.emitActiveTaskSteps()
  }

  removeActiveTaskStep = async ({ taskId }) => {
    await this.redisClient.del(`task_${this.socket.handshake.query.userId}_${taskId}`)
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
