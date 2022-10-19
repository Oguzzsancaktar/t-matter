class UserHandler {
  onlineUsers = {}
  io = null
  socket = null
  room = null
  userId = null

  constructor(io) {
    this.io = io
  }

  setSocket(socket) {
    this.socket = socket
    this.room = socket.handshake.query.room
    this.userId = socket.handshake.query.userId
  }

  addUser = () => {
    this.onlineUsers[this.userId] = true
    this.socket.join(this.room)
    this.io.in(this.room).emit('online', { onlineUsers: Object.keys(this.onlineUsers) })
  }

  removeUser = () => {
    delete this.onlineUsers[this.userId]
    this.socket.leave(this.room)
    this.io.in(this.room).emit('online', { onlineUsers: Object.keys(this.onlineUsers) })
  }
}

module.exports = UserHandler
