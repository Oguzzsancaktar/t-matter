const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    req.user = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
    next()
  } catch (error) {
    return res.status(401).send({
      message: 'Auth failed'
    })
  }
}

module.exports = {
  checkAuth
}
