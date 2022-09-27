import { Request } from "express";
import { Service } from "typedi";
import Users, { AuthDocument } from "../../../model/auth.model";

@Service()
export class ChatService {
  constructor() {}
  getAllUserService = async (req: Request) => {
    try {
      this.changeStatus(req)
      const user = await Users.find({_id:{$ne:req.body.id}}).select(["_id","username","image","fullname","lastmessage","status"]).sort({updatedAt:-1});
      return user;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

    async changeStatus(req:Request){
    return await Users.findByIdAndUpdate(req.body.id,{$set:{status:true}})
  }
}
