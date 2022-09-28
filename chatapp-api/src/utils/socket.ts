import { from } from "rxjs";
import Users from "../model/auth.model";
import { getMessages } from "../services/get-message.service";

export const socket =()=>{

 const io = require("socket.io")(5000, {
 cors: {
   origin: "*",
 },
});




let users:any = [];

const addUser = (userId:string, socketId:string) => {
 !users.some((user: { userId: string; }) => user.userId === userId) &&
   users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
 users = users.filter((user: { socketId: any; }) => user.socketId !== socketId);
};

const getUser = (userId:any) => {
 console.log("users",users)
 return users.find((user:any) => user.userId === userId);
};

io.on("connection", (socket:any) => {
 //when ceonnect
 console.log("a user connected.");

 //take userId and socketId from user
 socket.on("addUser", (userId: string) => {
   addUser(userId, socket.id);
   console.log("userID",socket.id)
   io.emit("getUsers", users);
 });

 //send and get message
 socket.on("sendMessage", async( from:any,to:any,text:any ) => {
   const user = await getUser(to);
   console.log(text,user.socketId)
   await timeout(500)
   const message:any =await getMessages(to,from)
   io.to(user.socketId).emit("getMessage", {
     "message" : message,
     "data" : from
   });
 });

 // when disconnect
 socket.on("disconnect", async() => {
   console.log("a user disconnected!");
   const ID = await userID(socket.id)
   const status = await Users.findByIdAndUpdate(ID,{$set:{status:false}})
   console.log(status)
   removeUser(socket.id);
   io.emit("getUsers", users);
 });
});

// http.listen(3000, () => {
//  console.log('listening on :3000');
// });

const timeout = (ms:number)=>{
 return new Promise(resolve => setTimeout(resolve, ms));
}
const userID = (socketID:string)=>{
  for(let i = 0; i<users.length; i++){
      if(users[i].socketId===socketID){
          const id = users[i].userId
          return id
      }
  }
  }
}
