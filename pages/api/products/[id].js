import dbConnect from "@/utils/dbConnect";
import Product from "@/utils/modals/Product";
import { createRouter } from "next-connect";
const router = createRouter();

router.patch(async (req, res) => {
  const {
    query: { id },
    body,
  } = req;

  await dbConnect();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
});

export default router.handler();

export const config = {
  api: {
    bodyParser: true,
  },
};
