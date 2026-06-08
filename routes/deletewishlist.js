
const router = require('express').Router()
const user = require('../models/user')
const requireAuth = require('../middleware/Requireauth')

router.delete('/',requireAuth, async (req, res) => {
  try {
    const body = await req.body
    const userId = req.userId;
    const itemId =  body.item_id;

    const userData = await user.findById(userId);

    if (!userData) {
      return res.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const itemIndex = userData.wishlist.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      return res.json(
        ({ success: false, message: "Item not found in wishlist" }),
        { status: 404 }
      );
    }

    userData.wishlist.splice(itemIndex, 1);

    await userData.save();
    return res.json({results:{ success: true }}, { status: 200 });
  } catch (err) {
    console.error(err);
    return res.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
});
module.exports = router