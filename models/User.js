import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.models.User || mongoose.model("User", UserSchema);
