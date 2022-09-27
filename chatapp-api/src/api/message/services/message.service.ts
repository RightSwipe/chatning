// import { constants } from "buffer";
import { Request } from "express";
import { Service } from "typedi";
import Users from "../../../model/auth.model";
import Message,{ MessageDocument } from "../../../model/message.model";

@Service()
export class MessageService{
 constructor(){}

 getAllMessageService = async(req:Request)=>{
  try {
   const { from, to } = req.body;

   const messages = await Message.find({
     users: {
       $all: [from, to],
     },
   }).sort({ time: -1 });

   const projectedMessages = messages.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
      time:msg.time
    };
  })
  return projectedMessages

  
 } catch (error:any) {
   console.log(error)
   throw new Error(error)
 }
}

addMessageService = async(req:Request)=>{
  try {
    console.log("Date",Date.now())
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      time: Date.now()
    });
    if(data){
      await Users.updateMany({_id:{$in:[from,to]}},{$set:{lastmessage:message}})

      
    }
    const add = await this.getAllMessageService(req)
    const msg = data? "Message added successfully" : "Failed to add message to the database"
    return {"data":data,"add":add}

  } catch (error:any) {
    console.log(error)
    throw Error(error)
  }
};

}
