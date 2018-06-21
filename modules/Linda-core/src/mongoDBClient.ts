import {
  _Tuple,
  _NFTuple,
  _SearchTuple,
  _ResponseTuple,
} from "./interfaces/tuple-type";

import db from "./mongoDB";
import { ObjectID, ObjectId } from "bson";

export default class storageClient {
  collection: any;

  constructor(tupleSpaceName: string) {
    this.collection = db.collection(tupleSpaceName);
  }

  get(searchTuple: _SearchTuple): _ResponseTuple | _NFTuple {
    // TODO:nullじゃない気がする
    let document: _ResponseTuple | null = this.collection.findOne(searchTuple);
    if (document) {
      document._isMuched = true;
      return document;
    } else {
      return { _isMuched: false, mes: "no match data" };
    }
  }

  insert(writeTuple: _Tuple): ObjectID {
    let result = this.collection.insert(writeTuple);
    return result.insertedId;
  }
  delete(id: ObjectID) {
    this.collection.drop({ _id: id });
  }
}
