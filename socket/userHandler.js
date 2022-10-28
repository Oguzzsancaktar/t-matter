class UserHandler {
  io = null
  socket = null
  room = null
  redisClient = null

  constructor(io, client) {
    this.io = io
    this.redisClient = client
  }

  setSocket(socket) {
    this.socket = socket
    this.room = socket.handshake.query.organization
  }

  static getOnlineUsers(usersObj) {
    return Object.keys(usersObj).filter(k => usersObj[k] === 'online')
  }

  addUser = async () => {
    this.socket.join(this.room)
    await this.redisClient.hSet('user', this.socket.handshake.query.userId, 'online')
    const usersObj = await this.redisClient.hGetAll('user')
    this.io.in(this.room).emit('online', { onlineUsers: UserHandler.getOnlineUsers(usersObj) })
  }

  removeUser = async () => {
    this.socket.leave(this.room)
    await this.redisClient.hSet('user', this.socket.handshake.query.userId, 'offline')
    const usersObj = await this.redisClient.hGetAll('user')
    this.io.in(this.room).emit('online', { onlineUsers: UserHandler.getOnlineUsers(usersObj) })
  }
}

module.exports = UserHandler
