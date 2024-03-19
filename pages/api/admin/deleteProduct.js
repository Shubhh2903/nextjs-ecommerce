import dbConnect from "@/utils/dbConnect";
import Order from "@/utils/modals/Order";
import Product from "@/utils/modals/Product";
import { createRouter } from "next-connect";
const router = createRouter();

router.delete(async (req, res) => {
  await dbConnect();
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    await Product.findByIdAndDelete(productId);

    await Order.deleteMany({ "products.productId": productId });

    res
      .status(200)
      .json({ message: "Product and associated orders deleted successfully" });
  } catch (error) {
    console.error("Failed to delete product and associated orders:", error);
    res
      .status(500)
      .json({
        message: "Failed to delete product and associated orders",
        error: error.message,
      });
  }
});

export default router.handler();

export const config = {
  api: {
    bodyParser: true,
  },
};
