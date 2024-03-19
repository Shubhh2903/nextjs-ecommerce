import { createRouter } from "next-connect";
import dbConnect from "@/utils/dbConnect";
import Order from "@/utils/modals/Order";
import Product from "@/utils/modals/Product";
import User from "@/utils/modals/User";

const router = createRouter();

router.get(async (req, res) => {
  await dbConnect();

  try {
    const orders = await Order.find({})
      .populate("userId", "name email")
      .populate({
        path: "products.productId",
        model: Product,
        select: "name description price imagePath",
      });
    const transformedOrders = orders.map((order) => {
      const orderData = order.toObject();

      if (orderData.products && orderData.products.length > 0) {
        const firstProduct = orderData.products[0];
        orderData.product = {
          productId: firstProduct.productId._id,
          name: firstProduct.productId.name,
          description: firstProduct.productId.description,
          price: firstProduct.productId.price,
          imagePath: firstProduct.productId.imagePath,
          quantity: firstProduct.quantity,
        };
      } else {
        orderData.product = {};
      }

      delete orderData.products;

      return orderData;
    });

    res.status(200).json({
      message: "All orders fetched successfully",
      orders: transformedOrders,
    });
  } catch (error) {
    console.error("Failed to fetch all orders:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch all orders", error: error.message });
  }
});

export default router.handler();
