const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { connect } = require('./src/database/db')
//const {serverClient} = require('./src/middlewares/streamChat')

const userRouter = require('./src/routes/user.routes')
const partyRouter = require('./src/routes/party.routes')

const port = process.env.PORT || 3000
const app = express()

// connect and start database
connect()

// Middleware
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// Routes
app.use('/api/users', userRouter)
app.use('/api/parties', partyRouter)

// respond to favicon requests with 204 no content
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            message: err.message
        }
    })
})

app.listen(port, () => console.log(`Server started on port ${port}`))