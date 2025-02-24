const Cart = require('../models/CartCollection');
const validator = require('validator')

const cartDetails = async (req, res) => {
  const productId = req.params._productId; // Corrected key
  const { title, price, quantity, size} = req.body;
  const userId = req.user._id;
  const total = quantity * price;
  

  try {
    
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      
      cart = await Cart.create({
        userId,
        items: [
          {
            productId,
            title,
            price,
            quantity,
            size,
            total
          }
        ],
        address: {
          name: "Name",
          street: "Street",
          city: "City",
          state: "State",
          country: "Country",
          postalCode: "000000",
          mobileNumber:1234567890
        },
       
      });
    } 
    
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
      cart.items[itemIndex].total =
      cart.items[itemIndex].quantity * price;
    } 

  
    // else {
    //   cart.items.push({ productId, quantity: 1 });
    // }
  
      else {
      
      cart.items.push({
        productId,
        title,
        price,
        quantity,
        size,
        total
      });
    }

    await cart.save();
    res.status(200).json({ msg: "Item added", success: true, cart });
  } catch (error) {
    res.status(500).json({ msg: "Error in adding item", error: error.message });
  }
};


// app.post('/cart/subtract', async (req, res) => {
//   const { userId, productId } = req.body;
//   let cart = await Cart.findOne({ userId });
//   if (cart) {
//     const item = cart.items.find((item) => item.productId.toString() === productId);
//     if (item && item.quantity > 1) {
//       item.quantity -= 1;
//     } else {
//       cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
//     }
//     await cart.save();
//   }
//   res.json(cart);
// });

const updateCart = async (req, res) => {
  const productId = req.params._productId;
  const {quantity} = req.body;
  const userId = req.user._id;
  try {
    let cart = await Cart.findOne({userId});
    if (cart) {
          const item = cart.items.find((item) => item.productId.toString() === productId);
          if (item && item.quantity > 1) {
            item.quantity -= 1;
          } else {
            cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
          }
          await cart.save();
        }
        res.json(cart);
  } catch (error) {
    res.status(500).json({msg:"error",error:error.message})
  }  
};

const deletePost = async(req,res)=>{
const productId = req.params._productId;
const userId = req.user._id;
// console.log(userId)
try{
  let cart = await Cart.findOne({userId});
  if(cart){
    cart.items = cart.items.filter(item=>item.productId.toString()!==productId);
    await cart.save();
    res.status(200).json({msg:"Item deleted",success:true,cart});
  }
  else{
    res.status(401).json({msg:"cart not found"})
  }

}
catch(error){
res.status(500).json({msg:"error in deleting",error:error.message})
}

}

const getallCartItems =async(req,res)=>{
  const userId = req.user._id;
  try {
    let cartItem = await Cart.find({userId}).populate({path:'items.productId',select:'image'})
    res.json({msg:"cart details fetched",success:true,cartItem})
  } catch (error) {
    res.json({msg:"error",success:false,error:error.message})
  }
}


const updateAddress = async (req, res) => {
  const userId = req.user._id;
  const {name, street, city, state, country, postalCode, mobileNumber } = req.body;
//   console.log("Request received:", req.body);
// console.log("Headers:", req.headers);


  // Validate required fields
  if (!name || !street || !city || !state || !country || !postalCode || !mobileNumber) {
    return res.status(400).json({ success: false, msg: "All fields are required"});
  }

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { 
        address: {name, street, city, state, country, postalCode ,mobileNumber}, 
        mobileNumber 
      },
      { new: true} // Enable validators
    );

    if (!updatedCart) {
      return res.status(404).json({ success: false, msg: "Cart not found for the user" });
    }

    res.status(200).json({ success: true, msg: "Details updated successfully", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error updating details", error: error.message });
  }
};




module.exports = {
  cartDetails,
  updateCart,
  deletePost,
  getallCartItems,
  updateAddress
};
