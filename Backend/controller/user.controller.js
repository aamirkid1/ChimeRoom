import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import Conversation from "../models/conversation.model.js";

import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

// // ================== SIGNUP ==================
// export const signup = async (req, res) => {
//   const { fullname, email, password, confirmPassword, avatar } = req.body;
//   try {
//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }

//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: "User already registered" });
//     }

//     if (!avatar) {
//       return res.status(400).json({ error: "Avatar is required" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       fullname,
//       email,
//       password: hashPassword,
//       avatar,
//     });
//     await newUser.save();

//     createTokenAndSaveCookie(newUser._id, res);

//     res.status(201).json({
//       message: "User created successfully",
//       user: {
//         _id: newUser._id,
//         fullname: newUser.fullname,
//         email: newUser.email,
//         avatar: newUser.avatar,
//       },
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // ================== LOGIN ==================
// export const login = async (req, res) => {
//   console.log("Login body:", req.body);
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     createTokenAndSaveCookie(user._id, res);

//     res.status(200).json({
//       message: "User logged in successfully",
//       user: {
//         _id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         avatar: user.avatar,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// ================== VERIFY EMAIL ==================
export const verifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Optional: Verify with Firebase Admin SDK
    const firebaseUser = await getAuth().getUserByEmail(email);
    if (!firebaseUser.emailVerified) {
      return res.status(400).json({ error: "Email not verified in Firebase yet" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// // ================== SIGNUP ==================
// export const signup = async (req, res) => {
//   const { fullname, email, password, confirmPassword, avatar } = req.body;

//   try {
//     if (password !== confirmPassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already registered" });
//     }

//     if (!avatar) {
//       return res.status(400).json({ error: "Avatar is required" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       fullname,
//       email,
//       password: hashPassword,
//       avatar,
//       isEmailVerified: false, //  Initially false
//     })
//     await newUser.save();

//     // Optional: you can create a token here but only allow login after verification
//     createTokenAndSaveCookie(newUser._id, res);

//     res.status(201).json({
//       message: "User created successfully. Please verify your email!",
//       user: {
//         _id: newUser._id,
//         fullname: newUser.fullname,
//         email: newUser.email,
//         avatar: newUser.avatar,
//         isEmailVerified: newUser.isEmailVerified,
//       },
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };




// // ================== LOGIN ==================
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//     // Block login if email not verified
//     if (!user.isEmailVerified) {
//       return res.status(400).json({ error: "Please verify your email before login" });
//     }

//     createTokenAndSaveCookie(user._id, res);

//     res.status(200).json({
//       message: "User logged in successfully",
//       user: {
//         _id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         avatar: user.avatar,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// ================== SIGNUP ==================
export const signup = async (req, res) => {
  const { fullname, email, avatar } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json({ message: "User already exists" });
    }

    const newUser = new User({
      fullname,
      email,
      avatar,
      isEmailVerified: false,
    });

    await newUser.save();

    res.status(201).json({
      message: "User saved successfully",
      user: newUser,
    });

  } catch (error) {
    console.error("Signup backend error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


  // // ================== LOGIN ==================
  // export const login = async (req, res) => {
  //   const { email } = req.body;

  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(400).json({ error: "User not registered" });
  //     }

  //     if (!user.isEmailVerified) {
  //       return res.status(400).json({
  //         error: "Please verify your email before login",
  //       });
  //     }

  //     createTokenAndSaveCookie(user._id, res);

  //     res.status(200).json({
  //       message: "Login successful",
  //       user: {
  //         _id: user._id,
  //         fullname: user.fullname,
  //         email: user.email,
  //         avatar: user.avatar,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     res.status(500).json({ error: "Internal server error" });
  //   }
  // };

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    //  AUTO-CREATE USER IF MISSING
    if (!user) {
      user = new User({
        fullname: "User",
        email,
        avatar: "avatar1.png",
        isEmailVerified: true,
      });
      await user.save();
    }

    createTokenAndSaveCookie(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.error("Login backend error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





// ================== CHECK USER ==================
export const checkUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ exists: true });
    }

    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


  // ================== BLOCK USER ==================
  export const blockUser = async (req, res) => {
    try {
      const { userIdToBlock } = req.body;
      const userId = req.user._id.toString();

      if (!userIdToBlock) {
        return res.status(400).json({ error: "userIdToBlock required" });
      }
      if (userId === userIdToBlock) {
        return res.status(400).json({ error: "You cannot block yourself" });
      }

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      // FIX: make sure array exists
      if (!Array.isArray(user.blockedUsers)) {
        user.blockedUsers = [];
      }

      if (!user.blockedUsers.some((id) => id.toString() === userIdToBlock)) {
        user.blockedUsers.push(userIdToBlock);
        await user.save();
      }

      res.status(200).json({
        message: "User blocked",
        blockedUsers: user.blockedUsers,
      });
    } catch (err) {
      console.error("Block error:", err);
      res.status(500).json({ error: "Server error" });
    }
  };

  // ================== UNBLOCK USER ==================
  export const unblockUser = async (req, res) => {
    try {
      const { userIdToUnblock } = req.body;
      const userId = req.user._id.toString();

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      //  FIX: avoid crash if array undefined
      user.blockedUsers = (user.blockedUsers || []).filter(
        (id) => id.toString() !== userIdToUnblock
      );

      await user.save();

      res.status(200).json({
        message: "User unblocked",
        blockedUsers: user.blockedUsers,
      });
    } catch (err) {
      console.error("Unblock error:", err);
      res.status(500).json({ error: "Server error" });
    }
  };

  // ================== GET BLOCKED USERS ==================
  export const getBlockedUsers = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate(
        "blockedUsers",
        "fullname email avatar"
      );

      res.status(200).json({
        blockedUsers: user?.blockedUsers || [],
      });
    } catch (err) {
      console.error("GetBlockedUsers error:", err);
      res.status(500).json({ error: "Server error" });
    }
  };

  // ================== LOGOUT ==================
  export const logout = async (req, res) => {
    try {
      res.clearCookie("jwt");
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // ================== ALL USERS ==================
  export const allUsers = async (req, res) => {
    try {
      const loggedInUser = req.user._id;

      const users = await User.find({ _id: { $ne: loggedInUser } }).select(
        "-password"
      );

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

      //  Sort users by latest message
      usersWithLastMessage.sort((a, b) => {
        const timeA = a.lastMessage?.createdAt
          ? new Date(a.lastMessage.createdAt)
          : new Date(0);
        const timeB = b.lastMessage?.createdAt
          ? new Date(b.lastMessage.createdAt)
          : new Date(0);
        return timeB - timeA;
      });

      res.status(200).json(usersWithLastMessage);
    } catch (error) {
      console.error("AllUsers error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

