import { Request } from "express";
import { Service } from "typedi";
import Users, { AuthDocument } from "../../../model/auth.model";

@Service()
export class ChatService {
  constructor() {}
  getUserService = async (req: Request) => {
    try {
      const user = await Users.findById(req.params.id);
      return user;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };
}
