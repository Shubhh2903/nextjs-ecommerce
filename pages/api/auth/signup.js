import dbConnect from "@/utils/dbConnect";
import User from "@/utils/modals/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  if (method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await User.create({ name, email, password });
      const token = jwt.sign({ id: user._id }, "shubham", {
        expiresIn: "7d",
      });

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
