import { createRouter } from "next-connect";
import multer from "multer";
import dbConnect from "@/utils/dbConnect";
import Product from "@/utils/modals/Product";
import auth from "@/middlewares/auth";

const router = createRouter();
// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: "public/uploads/", // adjust this path accordingly
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(auth).use(upload.single("productImage"));

// POST /api/products
router.post(async (req, res) => {
  await dbConnect();
  const { name, quantity, description, status } = req.body;
  const imagePath = req.file
    ? `http://${req.headers.host}/uploads/${req.file.filename}`
    : "";
  const product = await Product.create({
    name,
    quantity,
    description,
    status,
    imagePath,
  });

  try {
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router.handler();

// Disable Next.js body parser for this form to use multer
export const config = {
  api: {
    bodyParser: false,
  },
};
