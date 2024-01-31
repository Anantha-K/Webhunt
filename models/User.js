import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Kindly enter the name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Kindly enter the Email"],
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Kindly enter the password"],
    },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.models.User || mongoose.model("User", UserSchema);
