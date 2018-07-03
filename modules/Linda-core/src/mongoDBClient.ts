import {
  _Tuple,
  _NFTuple,
  _SearchTuple,
  _ResponseTuple,
  _IsMuchResponse,
} from "./interfaces/tuple-type";

import collection from "./mongoDB";
import { ObjectID } from "bson";

export default class storageClient {
  collection: any;

  constructor(tupleSpaceName: string) {
    this.collection = collection(tupleSpaceName);
  }

  async get(searchTuple: _SearchTuple): Promise<_ResponseTuple | _NFTuple> {
    // TODO:nullじゃない気がする
    let document: _ResponseTuple | null = await this.collection.findOne(
      searchTuple,
      {
        sort: { time: -1 },
      }
    );
    if (document) {
      document._isMuched = true;
      return document;
    } else {
      return { _isMuched: false, mes: "no match data" };
    }
  }

  insert(writeTuple: _Tuple): _Tuple {
    writeTuple.time = Date.now();
    let result = this.collection.insert(writeTuple);
    return result;
  }
  async delete(id: ObjectID): Promise<any> {
    await this.collection.deleteOne({ _id: id });
  }
  isMuch(targetTuple: _Tuple, searchTuple: _SearchTuple): _IsMuchResponse {
    for (let operationKey in searchTuple) {
      if (!targetTuple[operationKey]) {
        return { isMuched: false, res: null };
      } else if (targetTuple[operationKey] != searchTuple[operationKey]) {
        return { isMuched: false, res: null };
      }
    }
    return { isMuched: true, res: targetTuple };
  }
}
