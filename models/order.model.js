const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  order_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  order_info: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    required: true,
    enum: ["pending", "processing", "shipped", "delivered"],
  },
});

module.exports = mongoose.model("Order", schema);
