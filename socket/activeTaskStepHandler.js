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

  constructor(io) {
    this.io = io
  }

  setSocket(socket) {
    this.socket = socket
    this.room = socket.handshake.query.room
  }

  addActiveTaskStep = data => {
    if (this.activeTaskSteps.find(x => x.task._id === data.task._id && x.user._id === data.user._id)) {
      return
    }
    this.activeTaskSteps.push(data)
    this.io.in(this.room).emit('activeTaskSteps', this.activeTaskSteps)
  }

  removeActiveTaskStep = ({ taskId, userId }) => {
    this.activeTaskSteps = this.activeTaskSteps.filter(({ task, user }) => task._id === taskId && user._id === userId)
    this.io.in(this.room).emit('activeTaskSteps', this.activeTaskSteps)
  }

  taskStepChange = ({ taskId, userId, activeTaskStep }) => {
    const index = this.activeTaskSteps.findIndex(({ task, user }) => task._id === taskId && user._id === userId)
    if (index > -1) {
      this.activeTaskSteps[index].activeTaskStep = activeTaskStep
      this.io.in(this.room).emit('activeTaskSteps', this.activeTaskSteps)
    }
  }
  updateTaskWorkedTime = ({ taskId, workedTime }) => {
    console.log('updateTaskWorkedTime', taskId, workedTime)
    this.activeTaskSteps = this.activeTaskSteps.map(data => (data.task._id === taskId ? { ...data, workedTime } : data))
    this.io.in(this.room).emit('activeTaskSteps', this.activeTaskSteps)
  }
}

module.exports = ActiveTaskStepHandler
