import { Express, Request, Response } from "express";
import { AuthController } from "./api/auth/controllers/auth.controllers";
import { ChatController } from "./api/chats/controllers/chat.controller";
import Container from "typedi";


const routes = (app:Express)=>{
 const authController = Container.get(AuthController)
 const chatController = Container.get(ChatController)

 app.post('/register',authController.SaveUserHandler)
 app.post('/login',authController.getUserHandler)
 app.put('/newpassword',authController.newPasswordHandler)

 app.get('/user/:id',chatController.getUserHandler)

}

export default routes