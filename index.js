const express = require('express');
const {PORT, URI_HOST} = require('dotenv').config().parsed
const cors = require('cors')
const usersRouter = require('./routes/user.routes')
const tasksRouter = require('./routes/task.routes')
const app = express();
const morgan = require('morgan')

require('./db')

app.use(cors())
app.use(express.json())
app.use(morgan())
app.use('/users', usersRouter)
app.use('/tasks', tasksRouter)

app.listen(PORT, () => {
    console.log('listening on', PORT)
})
