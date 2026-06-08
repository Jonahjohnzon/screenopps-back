const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/login',        require('./routes/login'))
app.use('/api/logout',       require('./routes/logout'))
app.use('/api/createuser',   require('./routes/createuser'))
app.use('/api/getuser',      require('./routes/getuser'))
app.use('/api/getwishlist',  require('./routes/getwishlist'))
app.use('/api/pushwishlist', require('./routes/pushwishlist'))
app.use('/api/deletewishlist',require('./routes/deletewishlist'))
app.use('/api/wishlistid',   require('./routes/wishlistid'))
app.use('/api/gethistory',   require('./routes/gethistory'))
app.use('/api/pushhistory',  require('./routes/pushhistory'))

app.get('/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))