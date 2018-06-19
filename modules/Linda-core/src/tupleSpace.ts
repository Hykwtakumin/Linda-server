import {
  _NFTuple,
  _Tuple,
  _SearchTuple,
  _ResponseTuple,
} from "./interfaces/tuple-type";
import { Emitter } from "./eventEmitter";
//import storageClient from "./storageClient";

export default class tupleSpace {
  //FIXME:any型にしないで関数の型をあとでちゃんと書く
  storage: any;
  emitter: any;
  name: string;
  constructor(tupleSpaceName: string, storageClient: any) {
    this.emitter = new Emitter();
    this.storage = storageClient;
  }
  //TODO:numberで返していいものか検討
  write(writeTuple: _Tuple): string {
    this.emitter.emit("newTuple", writeTuple);
    return this.storage.insert(writeTuple);
  }
  read(searchTuple: _SearchTuple): _ResponseTuple | _NFTuple {
    return this.storage.get(searchTuple);
  }
  //FIXME:any型にしないで関数の型をあとでちゃんと書く
  watch(watchTuple: _SearchTuple, callback: any): void {
    this.emitter.on("newTuple", (resTuple: _Tuple) => {
      let result = this.storage.isMuch(resTuple, watchTuple);
      if (result.isMuched) {
        callback(result.res);
      }
    });
  }
  take(takeTuple: _SearchTuple): _ResponseTuple | _NFTuple {
    let result = this.storage.get(takeTuple);
    if (result._isMuched) {
      this.storage.delete(result.id);
    }
    return result;
  }
}
