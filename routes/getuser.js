const router = require('express').Router()
const mongoosedb = require('../lib/db')
const user = require('../models/user')
const requireAuth = require('../middleware/Requireauth')


router.get('/', requireAuth, async (req, res) => {
    try{
        await mongoosedb()
        const userId = req.userId;
        const data = await user.findOne({_id:userId})
        if(data)
        {
            const info ={
                user_id:data._id,
                user_name:data.user_name

            }
            return res.json({success:true, data:info})
        }
        else{
            return res.json({success:false, message:'User not found'})
        }
    }
    catch(err)
    {
                return res.json({ success: false, message: 'Error fetching user' })
    }
})
module.exports = router