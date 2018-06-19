import { MongoClient } from "mongodb";
import * as path from "path";

const url = path.join(
  "mongodb://",
  process.env.MONGO_HOST || "127.0.0.1",
  process.env.MONGO_DBNAME || "Linda"
);

let db: MongoClient;
MongoClient.connect(
  url,
  (err, mongodb) => {
    console.log("Connected correctly to db");
    db = mongodb;
  }
);

export default db;
