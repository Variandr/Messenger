const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express()
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const dialogsRoutes = require('./routes/dialogsRoutes')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/errorMiddleware')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(require('morgan')('dev'))
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/dialogs', dialogsRoutes)
app.use(errorMiddleware)
app.listen(port, () => console.log(`Server running on port ${port}!`))