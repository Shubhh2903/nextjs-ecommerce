import auth from "@/middlewares/auth";
import dbConnect from "@/utils/dbConnect";
import Order from "@/utils/modals/Order";
import { createRouter } from "next-connect";

const router = createRouter();
router.use(auth);
router.post(async (req, res) => {
  await dbConnect();

  const userId = req.user.id;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required." });
  }

  try {
    const order = await Order.create({
      userId,
      products: [{ productId, quantity }],
      status: "pending",
    });

    res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order creation error:", error);
    res
      .status(500)
      .json({ message: "Failed to place order", error: error.message });
  }
});

export default router.handler();
