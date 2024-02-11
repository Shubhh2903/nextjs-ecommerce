import dbConnect from "@/utils/dbConnect";
import Product from "@/utils/modals/Product";
import { createRouter } from "next-connect";
const router = createRouter();

router.get(async (req, res) => {
  await dbConnect();
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
});

export default router.handler();

export const config = {
  api: {
    bodyParser: false,
  },
};
