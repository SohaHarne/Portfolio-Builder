import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
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

  role: {
    type: String,
    enum: ["Student", "Professional"],
    required: true,
  },

  university: {
    type: String,
    default: "",
  },

  workplace: {
    type: String,
    default: "",
  },
});

export default mongoose.model("User", userSchema);