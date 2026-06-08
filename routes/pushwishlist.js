const router = require('express').Router()
const mongoosedb = require('../lib/db')
const user = require('../models/user')
const requireAuth = require('../middleware/Requireauth')

router.put('/',requireAuth, async (req, res) => {
  try {
    await mongoosedb();

    const userId = req.userId;
    const newItem = await req.json();

    const userData = await user.findById(userId);
    if (!userData) {
      return res.json(
       { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const alreadyAdded = userData.wishlist.some(
      (item) => item.id == newItem.id
    );

    if (alreadyAdded) {
      return res.json(
        { success: false, message: "Item already added" },
        { status: 200 }
      );
    }

    userData.wishlist.unshift(newItem);
    if (userData.wishlist.length > 100) {
      return res.json(
        { success: false, message: "Wishlist full, Please delete to make space", alert:true },
        { status: 200 }
      );
    }

    await userData.save();
    return res.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return res.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
});

module.exports = router