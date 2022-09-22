import mongoose from "mongoose";

export interface MessageDocument extends mongoose.Document {
  message: {text:string};
  users: [string];
  sender: mongoose.Types.ObjectId;
  time:Date
}

const MessageSchema = new mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    time:{
      type:Date,
      required:true
    }
  },
  // {
  //   timestamps: true,
  // }
);

const Message = mongoose.model<MessageDocument>("messages", MessageSchema);
export default Message;
