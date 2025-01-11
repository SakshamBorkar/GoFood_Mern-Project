const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // Check if food_items exists before sending
        if (!global.food_items || !global.foodCategory) {
            throw new Error('Food data not available');
        }
        res.json([global.food_items, global.foodCategory]); // res.json() only accepts one argument, so wrap in array
    } catch (error) {
        console.error('Error fetching food data:', error.message);
        res.status(500).json({ error: error.message }); // Send actual error message
    }
})

module.exports = router;