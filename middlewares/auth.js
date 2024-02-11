import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Authorization: Bearer TOKEN
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, "shubham");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

export default auth;
