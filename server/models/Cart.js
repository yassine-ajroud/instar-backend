const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {   
      type: mongoose.ObjectId,
      ref: "User",    
      required: true
    },
    sales: 
      [ {
        type:String,
        required: true,
      }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);