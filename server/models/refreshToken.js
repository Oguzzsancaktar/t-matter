const mongoose = require('mongoose')
const { Schema } = mongoose

const RefreshTokenSchema = new Schema({
  user: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  refreshToken: {
    required: true,
    type: String
  },
  expiryDate: {
    required: true,
    type: Date
  }
})

module.exports = RefreshToken = mongoose.model('refreshToken', RefreshTokenSchema)
