const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {
  console.log('DB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log('DB is not connected')
  console.log(err)
  process.exit(1)
})

exports.connect = async (url = '127.0.0.1/test') => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return mongoose.connection
}
