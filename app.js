const express = require('express')
require('./src/db/mongoose')
const UserRouter = require('./src/router/user')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(UserRouter)

app.listen(port, () => {
    console.log('Server is up on', port)
})
