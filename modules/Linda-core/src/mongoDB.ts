import { MongoClient, Db, Collection } from "mongodb";

const host = process.env.MONGO_HOST || "localhost";
const port = process.env.MONGO_PORT || ":27017";
const url = "mongodb://" + host + port;
console.log(url);

let db: Db;
//let db: any;

//v3.0から仕様が変わった？要調査
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

let collection = function(name: string): Collection {
  return db.collection(name);
};

export default collection;
