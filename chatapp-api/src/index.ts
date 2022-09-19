import "dotenv/config";
import cors from "cors";
import express from "express";
import connectApp from "./utils/app";
import connect from "./utils/connect";
import 'reflect-metadata';
import { RedisStore, client } from "./api/auth/services/session.service";
import routes from "./routes";
const PORT = process.env.PORT;

(async () => {
  await connect();
  const store = new RedisStore({ client })
  const app = connectApp(store)
  app.listen(PORT, async () => {
    console.log(`Server running on ${PORT}.`);
    routes(app)
  })
})()

