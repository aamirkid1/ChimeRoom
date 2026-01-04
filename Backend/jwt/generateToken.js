import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d", // 10 days
  });

  res.cookie("jwt", token, {
    httpOnly: true, // prevent XSS
    secure: process.env.NODE_ENV === "production", // only secure in prod
    sameSite: "strict", // prevent CSRF
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  });

  return token;
};

export default createTokenAndSaveCookie;
