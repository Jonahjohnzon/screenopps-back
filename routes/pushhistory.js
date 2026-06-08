const router = require('express').Router()
const mongoosedb = require('../lib/db')
const user = require('../models/user')
const requireAuth = require('../middleware/Requireauth')

router.get('/',requireAuth, async (req, res) => {
        try {
            await mongoosedb();
            
            const userId = req.userId;
            const newItem = await req.body;
            
            const userData = await user.findById(userId);
    
            if (!userData) {
                return res.json({ success: false, message: 'User not found' }, { status: 404 });
            }
            userData.history = userData.history.filter(item => item.id != newItem.id);
            userData.history.unshift(newItem);
    
            if (userData.history.length > 60) {
                userData.history = userData.history.slice(0, 60);
            }
    
            await userData.save();
    
            return res.json({ success: true }, { status: 200 });
        } catch (err) {
            console.error(err);
            return res.json({ success: false, error: err.message }, { status: 500 });
        }
    });
    
    module.exports = router