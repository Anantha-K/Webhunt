import mongoose from "mongoose";

const HuntSchema = new mongoose.Schema(
  {
    name:{ 
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        },
    score:{
            type: Number,
            default:0
          },
    level:{
            type: Number,
            default:0
          },
    currentLevelClues:{
            type:Number,
            default:0
    }
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.models.Hunt || mongoose.model("Hunt", HuntSchema);