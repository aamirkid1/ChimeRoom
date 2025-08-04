import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import Message from "../models/message.model.js";
import jwt from "jsonwebtoken";
import Conversation from "../models/conversation.model.js";
export const signup = async (req, res) => {
  // ✅ STEP 1: Destructure avatar from request body
  const { fullname, email, password, confirmPassword, avatar } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }
    // ✅ STEP 2: Validate avatar is selected (optional safety check)
    if (!avatar) {
      return res.status(400).json({ error: "Avatar is required" });
    }
    // Hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname,
      email,
      password: hashPassword,
      avatar, // ✅ Include avatar here
    });
    await newUser.save();
    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
          avatar: newUser.avatar, // ✅ Added this line
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async (req, res) => {
  //after 
  console.log("Login body:", req.body);

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "Invalid credentials" });

//     // Match password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     // Return user info and token
//     res.status(200).json({
//       message: "User logged in successfully",
//       token,
//       user: {
//         _id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         avatar: user.avatar,
//         createdAt: user.createdAt,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Login body:", req.body);

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // ✅ Set token as cookie
//     createTokenAndSaveCookie(user._id, res);

//     // ✅ Send consistent response format
//     res.status(200).json({
//       message: "User logged in successfully",
//       user: {
//         _id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         avatar: user.avatar, // Include avatar here
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Login body:", req.body);

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     const token = generateToken(user._id);

//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       avatar: user.avatar,
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Login body:", req.body);

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // This sets the JWT token as a cookie
//     createTokenAndSaveCookie(user._id, res);

//     res.status(200).json({
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       avatar: user.avatar,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const allUsers = async (req, res) => {
//   try {
//     const loggedInUser = req.user._id;
//     const filteredUsers = await User.find({
//       _id: { $ne: loggedInUser },
//     }).select("-password");
//     res.status(201).json(filteredUsers);
//   } catch (error) {
//     console.log("Error in allUsers Controller: " + error);
//   }
// };



export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const conversation = await Conversation.findOne({
          members: { $all: [loggedInUser, user._id] },
        }).populate({
          path: "messages",
          options: { sort: { createdAt: -1 }, limit: 1 },
        });

        return {
          ...user.toObject(),
          lastMessage: conversation?.messages[0] || null,
        };
      })
    );

    // Sort users by latest message timestamp (or fallback to createdAt)
    usersWithLastMessage.sort((a, b) => {
      const timeA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt) : new Date(0);
      const timeB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt) : new Date(0);
      return timeB - timeA;
    });

    res.status(201).json(usersWithLastMessage);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};
