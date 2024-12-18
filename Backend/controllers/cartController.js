import userModel from "../models/userModel.js"

///add item to user cart
const addToCart = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log request body to debug

    const { userId, itemId } = req.body;

    // Check for missing fields
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "userId and itemId are required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to add to cart" });
  }
};

//remove from cart
// Remove item from cart
const removeFormCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body; // Destructure userId and itemId

    // Validate request body
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "userId and itemId are required" });
    }

    // Find the user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Initialize cartData if null/undefined

    // Check if the item exists in the cart and is greater than 0
    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      // If the count becomes 0, optionally delete the item from the cart
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    } else {
      return res.status(400).json({ success: false, message: "Item not found in cart or already zero" });
    }

    // Update the cart data
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to remove from cart" });
  }
};

//featch user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate request body
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    // Fetch user data by ID
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {}; // Handle if cartData is null/undefined

    res.json({
      success: true,
      message: "Cart Data retrieved successfully",
      cartData: cartData, // Include the cart data in the response
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to get cart data" });
  }
};

 export {addToCart,removeFormCart,getCart}