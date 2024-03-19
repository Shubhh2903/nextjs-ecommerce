import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        ref: "Product",
      },
      name: {
        type: String,
        ref: "Product",
      },
      description: {
        type: String,
        ref: "Product",
      },
      imagePath: {
        type: String,
        ref: "Product",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "cancelled"],
  },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
