import { Request } from "express";
import { Service } from "typedi";
import  jwt from "jsonwebtoken"
import Users, { AuthDocument } from "../../../model/auth.model";
import { sendMail } from "../../../services/send-email.service";

@Service()
export class AuthService {
  constructor(private auth: AuthDocument) {}
  SaveUser = async (req: Request) => {
    const randomPin = Math.floor(100000 + Math.random() * 900000);
    const user = req.body;
    console.log(user);
    const check = await Users.findOne({ username: user.data.username });
    console.log(check)
    if (check === null) {
      const Userdoc = new Users({
        username: user.data.username,
        fullname: user.data.name,
        password: randomPin,
        email: user.data.email,
        image: user.image,
      });
      const data = await Userdoc.save();
      sendMail(
        user.data.email,
        randomPin,
        "Account is Created",
        `${randomPin}`
      );
      return data;
    }
    return check;
  };

  getUser = async (req: Request) => {
    try {
      const user = await Users.findOne({
        username: req.body.username,
        password: req.body.password,
      });
      let payload = { subject: req.body.username + req.body.password };
      let token = jwt.sign(payload, "secretKey");
      return {"user":user,"token":token};
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };
  newPassword = async (req: Request) => {
   console.log(req.body.username)
    const randomPin = Math.floor(100000 + Math.random() * 900000);
    try {
     console.log("set",`${randomPin}`)
      const user = await Users.findOneAndUpdate(
        {
          username: req.body.username,
        },
        {
          $set: {
            password: randomPin,
          },
        }
      );
      const email = user?.email;
      if (email) {
       console.log("email",`${randomPin}`)
        sendMail(email, randomPin, "New Password", `${randomPin}`);
      }
      return user;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  };
}
