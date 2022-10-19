class UserHandler {
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

  addUser = async () => {
    this.socket.join(this.room)
    const clients = await this.io.in(this.room).fetchSockets()
    this.io.in(this.room).emit('online', { onlineUsers: clients.map(({ handshake }) => handshake.query.userId) })
  }

  removeUser = async () => {
    this.socket.leave(this.room)
    const clients = await this.io.in(this.room).fetchSockets()
    this.io.in(this.room).emit('online', { onlineUsers: clients.map(({ handshake }) => handshake.query.userId) })
  }
}

module.exports = UserHandler
