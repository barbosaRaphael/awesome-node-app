import app from './app'
require('dotenv').config()

//  app init
const port: Number = parseInt(process.env.APP_PORT, 10)
app.listen(port)
console.log(`Server running at port ${port}`)
