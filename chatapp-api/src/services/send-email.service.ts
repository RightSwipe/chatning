// import express from "express";
import nodemailer from "nodemailer";

// const app = express();

export const sendMail = async (email: String,randomPin:String, subject: String, message: String) => {
  
  
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "diwaliwishestoyou@gmail.com",
        pass: "ppplcytemtgtagtq",
      },
    });

    var mailOptions = {
      from: "ChatApp <diwaliwishestoyou@gmail.com>",
      to: `${email}`,
      subject: `${subject}`,
      text: `${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email send:" + info.response);
      }
    });
   }
