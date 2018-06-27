import {
  _NFTuple,
  _Tuple,
  _SearchTuple,
  _ResponseTuple,
} from "./interfaces/tuple-type";
import Emitter from "./eventEmitter";
import { ObjectID } from "bson";
import { EventEmitter2 } from "eventemitter2";
//ここで選択できる
import storageClient from "./mongoDBClient";

export default class tupleSpace {
  //FIXME:any型にしないで関数/クラスインスタンスの型をあとでちゃんと書く
  storage: any;
  emitter: any;
  constructor(tupleSpaceName: string) {
    this.emitter = new EventEmitter2({
      wildcard: true,
      delimiter: "::",
      newListener: false,
      maxListeners: 20,
      verboseMemoryLeak: false,
    });
    this.storage = new storageClient(tupleSpaceName);
  }
  //TODO:numberで返していいものか検討
  async write(writeTuple: _Tuple): Promise<string | ObjectID> {
    this.emitter.emit("newTuple", writeTuple);
    return this.storage.insert(writeTuple);
  }
  async read(searchTuple: _SearchTuple): Promise<_ResponseTuple | _NFTuple> {
    let resData: _ResponseTuple | _NFTuple = this.storage.get(searchTuple);
    return resData;
  }

  //FIXME:any型にしないで関数の型をあとでちゃんと書く
  watch(watchTuple: _SearchTuple, callback: any): void {
    this.emitter.on("newTuple", (resTuple: _Tuple) => {
      console.log("new tuple!");
      let result = this.storage.isMuch(resTuple, watchTuple);
      if (result.isMuched) {
        callback(result.res);
      }
    });
  }

  async take(takeTuple: _SearchTuple): Promise<_ResponseTuple | _NFTuple> {
    let resData: _ResponseTuple | _NFTuple = await this.storage.get(takeTuple);
    if (resData._isMuched) {
      await this.storage.delete(resData._id);
    }
    return resData;
  }
}

//export { Emitter };
