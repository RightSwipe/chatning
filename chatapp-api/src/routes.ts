import { Express, Request, Response } from "express";
import { AuthController } from "./api/auth/controllers/auth.controllers";
import { ChatController } from "./api/chats/controllers/chat.controller";
import { MessageController } from "./api/message/controllers/message.controlls";
import Container from "typedi";


const routes = (app:Express)=>{
 const authController = Container.get(AuthController);
 const chatController = Container.get(ChatController);
 const messageController = Container.get(MessageController);

 app.post('/register',authController.SaveUserHandler)
 app.post('/login',authController.getUserHandler)
 app.put('/newpassword',authController.newPasswordHandler)
 app.get('/user/:id',chatController.getUserHandler)
 app.post('/add-message',messageController.addMessageHandler)
 app.post('/get-message',messageController.getMessageHandler)

}

export default routes