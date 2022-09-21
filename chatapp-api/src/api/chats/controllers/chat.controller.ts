import { Service } from "typedi";
import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";

@Service()
export class ChatController{
 constructor(private chatServices:ChatService){}
 getUserHandler =async (req:Request, res:Response) => {
  try {
   const response = await this.chatServices.getAllUserService(req)
   return res.status(201).json({
    status:201,
    message:"User Data",
    data: response
   })

   
  } catch (error:any) {
   return res.status(400).json({
    status:400,
    error:"Error",
    message:error.message
   })
   
  }
  
 }
 
}

