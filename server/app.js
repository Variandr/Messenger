const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000;
const app = express();
const authRoutes = require('./routes/authRoutes')
const passport = require('passport')
const cookieParser = require('cookie-parser')

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(cookieParser())
app.use(require('morgan')('dev'))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.listen(port, () => console.log(`Server running on port ${port}!`));