import { Service } from "typedi";
import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";

@Service()
export class ChatController{
 constructor(private chatServices:ChatService){}
 
}

