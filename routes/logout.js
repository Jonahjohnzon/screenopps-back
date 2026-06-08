const router = require('express').Router()

router.post('/', (req, res) => {
  res.clearCookie('accessToken', { httpOnly: true, sameSite: 'strict' })
  return res.json({ success: true, message: 'Logged out' })
})

module.exports = router