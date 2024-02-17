import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
    },
    quantity: {
      type: Number,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    placeDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      required: [true, "Please add a status"],
      enum: ["pending", "approved"],
    },
    imagePath: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
