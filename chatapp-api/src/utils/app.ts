import express, { Express, Request, Response } from "express";
import { SESSION_OPTIONS } from "../config/session";
import session, { Store } from "express-session";
import cors from "cors"

import Users from "../model/auth.model";
import { sendMail } from "../services/send-email.service";


const connectApp = (store: Store) => {
 const app = express();
 const http = require('http').createServer(app);
 app.use(cors());
 app.use(express.json({ limit: "200mb" }));
 app.use(session({
  ...SESSION_OPTIONS,
  store
 }))





 // app.post('/register', (req: Request, res: Response) => {
 //  const randomPin = Math.floor(100000 + Math.random() * 900000);
 //  const user = req.body
 //  const Userdoc =new Users({
 // username:user.data.username,
 // password:randomPin,
 // email:user.data.email,
 // image:user.image
 //  })
 //  Userdoc.save().then(()=>{
 //   console.log('Uploaded')
 //   sendMail(user.data.email,randomPin,"Account is Created",`${randomPin}`)

 //  })
 //  res.json({ message: "Works" })
 // })


 return app
}

export default connectApp