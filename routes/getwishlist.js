const router = require('express').Router()
const user = require('../models/user')
const requireAuth = require('../middleware/Requireauth')


router.get('/',requireAuth, async (req, res) => {
    try {
  
      const userId = req.userId;
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get('page'), 10) || 1; // Default to page 1 if not provided
  
      if (!userId) {
        return res.json(
          { success: false, message: 'User ID is missing' }),
          { status: 400 }
        
      }
  
      const userData = await user.findOne({ _id: userId });
  
      if (!userData) {
        return res.json(
          { success: false, message: 'User not found' }),
          { status: 404 }
        
      }
  
      const itemsPerPage = 20;
      const wishlist = userData.wishlist || [];
      const totalItems = wishlist.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
  
      if (page < 1 || page > totalPages) {
        return res.json({ success: false, message: 'Invalid page number' },
          { status: 400 }
        )
      }
  
      const startIndex = (page - 1) * itemsPerPage;
      const paginatedWishlist = wishlist.slice(startIndex, startIndex + itemsPerPage);
  
      return res.json(
        {
          success: true,
          data: paginatedWishlist,
          totalPages,
          currentPage: page,
        },
        { status: 200 }
      );
    } catch (err) {
      console.error(err);
      return res.json(
        { success: false, message: 'Server error' },
        { status: 500 }
      );
    }
  });

  module.exports = router
  