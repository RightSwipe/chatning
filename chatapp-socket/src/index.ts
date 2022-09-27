import express from 'express'
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http,{
 cors: {
  origin: "http://localhost:4200",
},
})

app.get('/', (req, res) => {
 res.send('<h1>Hey Socket.io</h1>');
});

// io.on('connection', (socket:any) => {
//  console.log('a user connected');
//  socket.on('disconnect', () => {
//    console.log('user disconnected');
//  });
// });



let users:any = [];

const addUser = (userId:string, socketId:string) => {
  !users.some((user: { userId: string; }) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user: { socketId: any; }) => user.socketId !== socketId);
};

const getUser = (userId: any) => {
  return users.find((user: { userId: any; }) => user.userId === userId);
};

io.on("connection", (socket:any) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId: string) => {
    addUser(userId, socket.id);

    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ( senderId:any, receiverId:any, text:any ) => {
    const user = getUser(receiverId);
    console.log(text,user)
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

http.listen(3000, () => {
 console.log('listening on *:3000');
});
