import { Request } from "express";
import { Service } from "typedi";
import  jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users, { AuthDocument } from "../../../model/auth.model";
import { sendMail } from "../../../services/send-email.service";

@Service()
export class AuthService {
  constructor(private auth: AuthDocument) {}
  SaveUser = async (req: Request) => {
    const randomVal = Math.random().toString(36).substring(2, 8);
    const hashedPassword = await bcrypt.hash(randomVal,10)
    const user = req.body;
    console.log(user);
    const check = await Users.findOne({ username: user.data.username });
    console.log(check)
    if (check === null) {
      const Userdoc = new Users({
        username: user.data.username,
        fullname: user.data.name,
        password: hashedPassword,
        email: user.data.email,
        image: user.image,
      });
      const data = await Userdoc.save();
      sendMail(
        user.data.email,
        randomVal,
        "Account is Created",
        `${randomVal}`
      );
      return data;
    }
    return check;
  };

  getUser = async (req: Request) => {
    try {
      const {username,password} = req.body
      const user = await Users.findOne({
        username: username
      });


      const dbpassword = user?.password!
      const isPasswordValid =await bcrypt.compare(password, dbpassword)
      console.log("valid",isPasswordValid)
      if(isPasswordValid){
        let payload = { subject: req.body.username + req.body.password };
        let token = jwt.sign(payload, "secretKey");
        console.log("password succss")
        return {"user":user,"token":token};
      }

      console.log("unsuccessful")
      return "Invalid Credentials"

    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };
  newPassword = async (req: Request) => {
   console.log(req.body.username)
    const randomVal = Math.random().toString(36).substring(2, 8);
    try {
     console.log("set",`${randomVal}`)
      const user = await Users.findOneAndUpdate(
        {
          username: req.body.username,
        },
        {
          $set: {
            password: randomVal,
          },
        }
      );
      const email = user?.email;
      if (email) {
       console.log("email",`${randomVal}`)
        sendMail(email, randomVal, "New Password", `${randomVal}`);
      }
      return user;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };
}
