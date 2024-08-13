import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Kindly enter the name"],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Kindly enter a valid email",
      ],
      unique: true,
      required: [true, "Kindly enter the Email"],
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Kindly enter the password"],
    },
    currentLevel: { type: Number, default: 1 },
    score: { type: Number, default: 0 },
    hintsRemaining: { type: Number, default: 3 },
    lastLoginDate: { type: Date, default: Date.now },
    registrationDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.models.User || mongoose.model("User", UserSchema);
