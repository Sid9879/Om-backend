const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:true
    },
    title:{
       type:String,
       required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    size:{
        type:String,
    },
    total:{
        type:Number,
        required:true
    }


})

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    items:[CartItemSchema],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalItems:{
        type:Number,
        required:true,
        default:0
    },
    address: {
      name:{
        type:String,
      },
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        mobileNumber:{
          type:String,
          required:true
        }
      }
    
  
},{timestamps:true})

CartSchema.pre("save", function (next) {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce((sum, item) => sum + item.total, 0);


    next();
  });

  module.exports = mongoose.model("Cart", CartSchema);