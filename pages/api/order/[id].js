import dbConnect from "@/utils/dbConnect";
import Order from "@/utils/modals/Order";
import { createRouter } from "next-connect";
const router = createRouter();

router.patch(async (req, res) => {
  const {
    query: { id },
    body,
  } = req;

  await dbConnect();

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true, runValidators: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      product: updatedOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update order", error: error.message });
  }
});

export default router.handler();

export const config = {
  api: {
    bodyParser: true,
  },
};
