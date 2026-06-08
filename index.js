const express = require('express')
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoosedb = require('./lib/db')
require('dotenv').config()


const app = express()
app.use(cookieParser())
app.use(cors({
  origin: "https://screenopps-back.vercel.app/", // Next.js frontend
  credentials: true
}));

mongoosedb()
app.use(express.json())

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

// const PORT = process.env.PORT || 4000
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
module.exports = app;