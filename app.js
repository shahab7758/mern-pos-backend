const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const brandsRoute = require('./routes/brands')
const userRoute = require('./routes/user')
const postRoute = require('./routes/posts')
const cors = require('cors')


dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected to db')
})


app.use(cors())
app.use(express.json())
app.use('/api', brandsRoute)
app.use('/api/', userRoute)
app.use('/posts', postRoute)


const PORT = 4000
app.listen(PORT, () => {
    console.log(`server is up and running http://localhost:${PORT}`)
})