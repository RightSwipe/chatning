import { Request } from "express";
import { Service } from "typedi";
import Users, { AuthDocument } from "../../../model/auth.model";

@Service()
export class ChatService {
  constructor() {}
  getAllUserService = async (req: Request) => {
    try {
      this.changeStatus(req)
      const switchNum = req.body.switchNum
      switch (switchNum) {
        case 0:
            const user = await Users.find({_id:{$ne:req.body.id}}).select(["_id","username","image","fullname","lastmessage","status","updatedAt"]).sort({updatedAt:-1});
          return user;
        case 1:
          let user1 = await Users.find({_id:{$ne:req.body.id},lastmessage:{$ne:null}}).select(["_id","username","image","fullname","lastmessage","status","updatedAt"]).sort({updatedAt:-1});
          return user1;
        case 2:
          const user2 = await Users.find({_id:{$ne:req.body.id},status:true}).select(["_id","username","image","fullname","lastmessage","status","updatedAt"]).sort({updatedAt:-1});
          return user2;
      }
      
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };

    async changeStatus(req:Request){
    return await Users.findByIdAndUpdate(req.body.id,{$set:{status:true}})
  }
}
