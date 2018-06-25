import { MongoClient, Db } from "mongodb";
import * as path from "path";

const host = process.env.MONGO_HOST || "127.0.0.1";
const dbname = process.env.MONGO_DBNAME || "linda";
//const url = path.join("mongodb://", host, dbname);
const url = "mongodb://localhost:27017";
console.log(url);

let db: any;

MongoClient.connect(
  url,
  (err, client) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected correctly to db");
    db = client.db("linda");
  }
);

let collection = function(name: string) {
  return db.collection(name);
};

export default collection;
