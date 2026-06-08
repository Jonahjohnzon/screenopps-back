const router = require('express').Router()
const user = require('../models/user')
const requireAuth = require('../middleware/Requireauth')

router.get('/',requireAuth, async (req, res) => {
  try {
    const userId = req.userId;

    const data = await user.findOne({ _id: userId });
    if (data) {
        
      const wishlistIds = data.wishlist.map((item) => item.id); 
      return res.json(
        { success: true, data: wishlistIds },
        { status: 200 }
      );
    } else {
      return res.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
  } catch (err) {
    console.error(err);
    return res.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
});
module.exports = router