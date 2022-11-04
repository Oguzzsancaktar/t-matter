const dataAccess = require('../data-access')

class UserHandler {
  io = null
  socket = null
  room = null

  constructor(io, client) {
    this.io = io
    this.redisClient = client
  }

  setSocket(socket) {
    this.socket = socket
    this.room = socket.handshake.query.organization
  }

  static getUsers = async () => {
    const onlineUsers = await dataAccess.userDataAccess.findOnlineUsers()
    return onlineUsers.map(user => user._id)
  }

  addUser = async () => {
    this.socket.join(this.room)
    await dataAccess.userDataAccess.findByIdAndUpdateUser(this.socket.handshake.query.userId, { isOnline: true })
    let onlineUsers = await UserHandler.getUsers()
    this.io.in(this.room).emit('online', { onlineUsers })
  }

  removeUser = async () => {
    this.socket.leave(this.room)
    await dataAccess.userDataAccess.findByIdAndUpdateUser(this.socket.handshake.query.userId, { isOnline: false })
    const onlineUsers = await UserHandler.getUsers()
    this.io.in(this.room).emit('online', { onlineUsers })
  }
}

module.exports = UserHandler
