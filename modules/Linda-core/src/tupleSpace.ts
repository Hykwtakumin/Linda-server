import {
  _NFTuple,
  _Tuple,
  _SearchTuple,
  _ResponseTuple,
} from "./interfaces/tuple-type";
//import Emitter from "./eventEmitter";
import { ObjectID } from "bson";
import { EventEmitter2 } from "eventemitter2";
import app from "./app";
//ここで選択できる
import storageClient from "./mongoDBClient";

// export default class tupleSpace {
//   //FIXME:any型にしないで関数/クラスインスタンスの型をあとでちゃんと書く
//   storage: any;
//   emitter: any;
//   io: any;
//   socket: any;
//   tupleSpaceName: string;
//   constructor(tupleSpaceName: string) {
//     this.emitter = new EventEmitter2({
//       wildcard: true,
//       delimiter: "::",
//       newListener: false,
//       maxListeners: 20,
//       verboseMemoryLeak: false,
//     });
//     this.tupleSpaceName = tupleSpaceName;
//     this.storage = new storageClient(tupleSpaceName);
//   }
//   //TODO:numberで返していいものか検討
//   async write(writeTuple: _Tuple): Promise<string | ObjectID> {
//     this.emitter.emit("newTuple", writeTuple);
//     return this.storage.insert(writeTuple);
//   }
//   async read(searchTuple: _SearchTuple): Promise<_ResponseTuple | _NFTuple> {
//     let resData: _ResponseTuple | _NFTuple = this.storage.get(searchTuple);
//     return resData;
//   }

//   //FIXME:any型にしないで関数の型をあとでちゃんと書く
//   watch(watchTuple: _SearchTuple, callback: any): void {
//     this.emitter.on("newTuple", (resTuple: _Tuple) => {
//       let result = this.storage.isMuch(resTuple, watchTuple);
//       if (result.isMuched) {
//         this.socket.emit(this.tupleSpaceName, result.res);
//         callback(result.res);
//       }
//     });
//   }

//   async take(takeTuple: _SearchTuple): Promise<_ResponseTuple | _NFTuple> {
//     let resData: _ResponseTuple | _NFTuple = await this.storage.get(takeTuple);
//     if (resData._isMuched) {
//       await this.storage.delete(resData._id);
//     }
//     return resData;
//   }
// }

// //export { Emitter };
export default class tupleSpace extends EventEmitter2 {
  //FIXME:any型にしないで関数/クラスインスタンスの型をあとでちゃんと書く
  storage: any;
  tupleSpaceName: string;
  constructor(tupleSpaceName: string) {
    super({
      wildcard: true,
      delimiter: "::",
      newListener: false,
      maxListeners: 20,
      verboseMemoryLeak: false,
    });
    this.tupleSpaceName = tupleSpaceName;
    this.storage = new storageClient(tupleSpaceName);
  }
  //TODO:numberで返していいものか検討
  write(writeTuple: _Tuple, callback: any): void {
    this.storage.insert(writeTuple);
    this.emit("_writeData", writeTuple);
    //TODO:そのまま返してるだけになってる
    callback(writeTuple);
  }
  async read(searchTuple: _SearchTuple, callback: any): Promise<any> {
    let resData: _ResponseTuple | _NFTuple = await this.storage.get(
      searchTuple
    );
    callback(resData);
    this.emit("_readData", resData);
  }

  //FIXME:any型にしないで関数の型をあとでちゃんと書く
  watch(watchTuple: _SearchTuple, callback: any): void {
    this.on("_writeData", (resTuple: _Tuple) => {
      let result = this.storage.isMuch(resTuple, watchTuple);
      if (result.isMuched) {
        this.emit("_watchData", result.res);
        callback(result.res);
      }
    });
  }

  async take(takeTuple: _SearchTuple, callback: any): Promise<any> {
    let resData: _ResponseTuple | _NFTuple = await this.storage.get(takeTuple);
    console.log(resData._id);
    if (resData._isMuched) {
      await this.storage.delete(resData._id);
    }
    this.emit("_takeData", resData);
    callback(resData);
  }
}

//export { Emitter };
