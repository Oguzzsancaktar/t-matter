const path = require('path')

const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
// const { Redis } = require('@upstash/redis/with-fetch')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const { createServer } = require('http')
const { Server } = require('socket.io')
const routes = require('./routes')
const cronJobs = require('./cron/cronJobs')
const UserHandler = require('./socket/userHandler')
const ActiveTaskStepHandler = require('./socket/activeTaskStepHandler')
const URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

const main = async () => {
  try {
    //MONGODB
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log('Error connecting to MongoDB:', err.message)
  }
  const app = express()
  const httpServer = createServer(app)

  //SOCKET IO
  const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
  })
  //REDIS
  try {
    // var redisClient = new Redis({
    //   url: process.env.UPSTASH_REDIS_REST_URL,
    //   token: process.env.UPSTASH_REDIS_REST_TOKEN
    // })

    console.log('Connected to Redis')
  } catch (err) {
    console.log('Error connecting to Redis:', err.message)
  }

  app.use(express.json())
  app.use(cookieParser())
  app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }))
  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        'img-src': ["'self'", 'https: data: blob:']
      }
    })
  )
  app.use(cors())
  app.use(morgan('dev'))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use('/api', routes)

  const userHandler = new UserHandler(io)
  const activeTaskStepHandler = new ActiveTaskStepHandler(io)

  io.on('connection', socket => {
    userHandler.setSocket(socket)
    userHandler.addUser()
    activeTaskStepHandler.setSocket(socket)

    socket.on('addActiveTaskStep', async data => {
      await activeTaskStepHandler.addActiveTaskStep(data)
    })

    socket.on('removeActiveTaskStep', async data => {
      await activeTaskStepHandler.removeActiveTaskStep(data)
    })

    socket.on('taskStepChange', async data => {
      await activeTaskStepHandler.taskStepChange(data)
    })

    socket.on('updateTaskWorkedTime', async data => {
      // await activeTaskStepHandler.updateTaskWorkedTime(data)
    })

    socket.on('disconnect', async () => {
      await userHandler.removeUser()
      await activeTaskStepHandler.removeAllUserActiveTaskSteps()
    })
  })

  // error handler
  app.use(function (err, req, res, next) {
    console.log(err)
    res.sendStatus(err.status || 500)
  })

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error)
  })

  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true
    })
  )

  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
  })

  cronJobs()

  httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

main().then(() => console.log('SUCCESS STARTING SERVER'))
