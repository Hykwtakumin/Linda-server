import {
  _NFTuple,
  _Tuple,
  _SearchTuple,
  _ResponseTuple,
} from "./interfaces/tuple-type";
import Emitter from "./eventEmitter";
import { ObjectID } from "bson";
//import storageClient from "./storageClient";

export default class tupleSpace {
  //FIXME:any型にしないで関数/クラスインスタンスの型をあとでちゃんと書く
  storage: any;
  constructor(storageClient: any) {
    this.storage = storageClient;
  }
  //TODO:numberで返していいものか検討
  async write(writeTuple: _Tuple): Promise<string | ObjectID> {
    Emitter.emit("newTuple", writeTuple);
    return this.storage.insert(writeTuple);
  }
  async read(searchTuple: _SearchTuple): Promise<_ResponseTuple | _NFTuple> {
    let resData: _ResponseTuple | _NFTuple = this.storage.get(searchTuple);
    return resData;
  }

  //FIXME:any型にしないで関数の型をあとでちゃんと書く
  watch(watchTuple: _SearchTuple, callback: any): void {
    Emitter.on("newTuple", (resTuple: _Tuple) => {
      let result = this.storage.isMuch(resTuple, watchTuple);
      if (result.isMuched) {
        callback(result.res);
      }
    });
  }

  async take(takeTuple: _SearchTuple): Promise<_ResponseTuple | _NFTuple> {
    let resData: _ResponseTuple | _NFTuple = await this.storage.get(takeTuple);
    if (resData._isMuched) {
      //console.log(resData._id);
      await this.storage.delete(resData._id);
      //this.storage.delete(0);
    }
    return resData;
  }
}

export { Emitter };
