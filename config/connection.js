const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/social_network_api_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose.connection;
