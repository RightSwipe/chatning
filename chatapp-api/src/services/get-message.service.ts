import express from "express";
import Message from "../model/message.model";
const app = express();

export const getMessages = async (from:any,to:any)=>{
 try{
const messages = await Message.find({
 users: {
   $all: [from, to],
 },
}).sort({ time: -1 });

const projectedMessages:any = messages.map((msg) => {
return {
  fromSelf: msg.sender.toString() === from,
  message: msg.message.text,
  time:msg.time
};
})
return projectedMessages
}
 catch (error:any) {
console.log(error)
throw new Error(error)
}
}