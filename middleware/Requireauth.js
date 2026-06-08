const JWT = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const token = req.cookies?.accessToken

  if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' })

  try {
    const decoded = JWT.verify(token, process.env.DB_JWTS)
    req.userId = decoded.id
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

module.exports = requireAuth