import { Request } from "express";
import { Service } from "typedi";
import Users, { AuthDocument } from "../../../model/auth.model";

@Service()
export class ChatService {
  constructor() {}
  getAllUserService = async (req: Request) => {
    try {
      const user = await Users.find({_id:{$ne:req.params.id}}).select(["_id","username","image","fullname"]);
      return user;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };
}
