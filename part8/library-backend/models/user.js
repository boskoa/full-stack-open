const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
  },
  favouriteGenre: {
    type: String,
  },
})

module.exports = mongoose.model('User', schema)
