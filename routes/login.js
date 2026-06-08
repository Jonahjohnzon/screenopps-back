const router = require('express').Router()
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const yup = require('yup')
const user = require('../models/user')

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
})

router.post('/', async (req, res) => {
  try {
    await loginSchema.validate(req.body)

    const emailinfo = req.body.email.toUpperCase()
    const info = await user.findOne({ email: emailinfo })

    if (!info) {
      return res.json({ success: false, message: 'Email not found' })
    }

    const result = await bcrypt.compare(req.body.password, info.password)
    if (!result) {
      return res.json({ success: false, message: 'Password Wrong' })
    }

    const token = JWT.sign({ id: info._id }, "JKDGKFJIJKHKJEHIJFHJHKJKJHJKHKJgkjgwkuyeuib3jkbfbdkjfjk")
    
    res.cookie('accessToken', token, {
      httpOnly: true,
      maxAge: 60 * 30 * 24 * 60 * 60 * 1000, // milliseconds in Express
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })

    return res.json({
      success: true,
      token,
      data: {
        user_name: info.user_name,
        _id: info._id,
        ban: info.ban,
      },
    })
  } catch (err) {
    console.log(err)
    return res.json({ success: false, message: 'An error occurred during login' })
  }
})

module.exports = router