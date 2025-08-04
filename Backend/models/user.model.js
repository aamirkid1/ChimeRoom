import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
    },
      avatar: {
    type: String,         // ✅ Add this line
    required: true,       // ✅ Make it required if you always want avatar selected
  },
}, { timestamps: true }); // createdAt & updatedAt

const User = mongoose.model("User", userSchema);
export default User;