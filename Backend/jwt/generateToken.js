import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // xss
    // secure: true,
     secure: process.env.NODE_ENV === "production", // only true on production
    sameSite: "strict", // csrf
  });
};
export default createTokenAndSaveCookie;
