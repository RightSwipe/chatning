import { Request, Response } from "express";
import { Service } from "typedi";
import { MessageService } from "../services/message.service";
import { MessageDocument } from "../../../model/message.model";

@Service()
export class MessageController{
 constructor(private messageService:MessageService){}

 getMessageHandler =async (req:Request,res:Response) => {
  try {
   const response = await this.messageService.getAllMessageService(req);
   return res.status(201).json({
    status:201,
    message:"Recieved all messages",
    data:response
   })

   
  } catch (error:any) {
   return res.status(400).json({
    status:400,
    error:"Error",
    message:error.message
   })
   
  }
  
 }

 addMessageHandler =async (req:Request,res:Response) => {
  try {
   const response = await this.messageService.addMessageService(req);
   return res.status(201).json({
    status:201,
    message:"Messages",
    data:response
   })
   
  } catch (error:any) {
   return res.status(400).json({
    status:201,
    error:"Error",
    message:error.message
   })
   
  }
  
 }

}

