import { Service } from "typedi";
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";


@Service()
export class AuthController {
  constructor(private authService: AuthService) {}
  SaveUserHandler = async (req: Request, res: Response) => {
    try {
      const response = await this.authService.SaveUser(req);
      console.log("success", response);
      return res.status(201).json({
        status: 201,
        message: "New User is Created",
        data: response,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: 400,
        error: "Error",
        message: error.message,
      });
    }
  };

  getUserHandler = async (req: Request, res: Response) => {
    try {
      const response = await this.authService.getUser(req);
      console.log("res",response)
      if (response !== null){
      return res.status(201).json({
        status: 201,
        message: "You are logged in",
        data: response,
      })
     }
     else{
      res.status(400).json({
       status:400,
       messaage:"Error",
      })
     }
    } catch (error: any) {
      return res.status(400).json({
        status: 400,
        error: "Error",
        message: error.message,
      });
    }
  };

  newPasswordHandler = async (req: Request, res: Response) => {
   try {
     const response = await this.authService.newPassword(req);
     console.log("res",response)
     if (response !== null){
     return res.status(201).json({
       status: 201,
       message: "Check your email",
       data: response,
     })
    }
    else{
     res.status(400).json({
      status:400,
      messaage:"Error",
     })
    }
   } catch (error: any) {
     return res.status(400).json({
       status: 400,
       error: "Error",
       message: error.message,
     });
   }
 };

}
