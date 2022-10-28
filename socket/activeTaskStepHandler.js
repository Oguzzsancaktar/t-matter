class ActiveTaskStepHandler {
  /*
  * activeTaskSteps = {
      task: ICustomerTask
      user: IUser
      activeTaskStep: number
    }[]
  * */
  activeTaskSteps = []
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
    return this.redisClient.hSet(`task_${this.socket.handshake.query.userId}`, taskId, JSON.stringify(data))
  }

  getActiveTaskStep = async ({ taskId }) => {
    const x = await this.redisClient.hGet(`task_${this.socket.handshake.query.userId}`, taskId)
    return JSON.parse(x)
  }

  async getActiveTaskSteps(userIdArr) {
    const activeTaskSteps = []
    for (const key of userIdArr) {
      const data = await this.redisClient.hGetAll(key)
      Object.values(data).forEach(value => {
        activeTaskSteps.push(JSON.parse(value))
      })
    }
    return activeTaskSteps
  }

  addActiveTaskStep = async data => {
    if (this.activeTaskSteps.find(x => x.task._id === data.task._id && x.user._id === data.user._id)) {
      return
    }
    await this.setTaskStep({ taskId: data.task._id, data })
    const userIdArr = await this.redisClient.keys(`task_*`)
    const activeTaskSteps = await this.getActiveTaskSteps(userIdArr)
    this.io.in(this.room).emit('activeTaskSteps', activeTaskSteps)
  }

  removeActiveTaskStep = async ({ taskId, userId }) => {
    await this.redisClient.hDel(`task_${userId}`, taskId)
    const userIdArr = await this.redisClient.keys(`task_*`)
    const activeTaskSteps = await this.getActiveTaskSteps(userIdArr)
    this.io.in(this.room).emit('activeTaskSteps', activeTaskSteps)
  }

  taskStepChange = async ({ taskId, activeTaskStep }) => {
    let data = await this.getActiveTaskStep({ taskId })
    data.activeTaskStep = activeTaskStep
    await this.setTaskStep({ taskId, data })
    const userIdArr = await this.redisClient.keys(`task_*`)
    const activeTaskSteps = await this.getActiveTaskSteps(userIdArr)
    this.io.in(this.room).emit('activeTaskSteps', activeTaskSteps)
  }

  updateTaskWorkedTime = async ({ taskId, workedTime }) => {
    let data = await this.getActiveTaskStep({ taskId })
    data.workedTime = workedTime
    await this.setTaskStep({ taskId, data })
    const userIdArr = await this.redisClient.keys(`task_*`)
    const activeTaskSteps = await this.getActiveTaskSteps(userIdArr)
    this.io.in(this.room).emit('activeTaskSteps', activeTaskSteps)
  }
}

module.exports = ActiveTaskStepHandler
