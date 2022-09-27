import express from "express";
import { SESSION_OPTIONS } from "../config/session";
import session, { Store } from "express-session";
import cors from "cors"
import { socket } from "./socket";


socket();

const connectApp = (store: Store) => {
 const app = express();
 const http = require('http').createServer(app);
 app.use(cors());
 app.use(express.json({ limit: "200mb" }));
 app.use(session({
  ...SESSION_OPTIONS,
  store
 }))


 return app
}

export default connectApp