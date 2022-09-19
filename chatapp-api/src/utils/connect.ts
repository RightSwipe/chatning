import "dotenv/config";
import mongoose from "mongoose";

const connect = async () => {
  const db_uri = process.env.MONGO_URI as string
  try {
    await mongoose
      .connect(db_uri);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    console.log("Could not connect to db");
    process.exit(1);
  }
}

export default connect