class UserHandler {
  onlineUsers = {}
  io = null

  constructor(io) {
    this.io = io
  }

  addUser = id => {
    this.onlineUsers[id] = true
    this.io.emit('online', { onlineUsers: Object.keys(this.onlineUsers) })
  }

  removeUser = id => {
    delete this.onlineUsers[id]
    this.io.emit('online', { onlineUsers: Object.keys(this.onlineUsers) })
  }
}

module.exports = UserHandler
