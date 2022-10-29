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

  static getUsers = async redisClient => {
    let userKeys = await redisClient.keys('user_*')
    if (userKeys.length > 0) {
      userKeys = userKeys.map(x => x.split('_')[1])
    }
    return userKeys
  }

  addUser = async () => {
    this.socket.join(this.room)
    await this.redisClient.set(`user_${this.socket.handshake.query.userId}`, '')
    const onlineUsers = await UserHandler.getUsers(this.redisClient)
    this.io.in(this.room).emit('online', { onlineUsers })
  }

  removeUser = async () => {
    this.socket.leave(this.room)
    await this.redisClient.del(`user_${this.socket.handshake.query.userId}`)
    const onlineUsers = await UserHandler.getUsers(this.redisClient)
    this.io.in(this.room).emit('online', { onlineUsers })
  }
}

module.exports = UserHandler
