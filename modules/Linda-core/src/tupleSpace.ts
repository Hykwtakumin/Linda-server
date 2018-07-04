import {
  _NFTuple,
  _Tuple,
  _SearchTuple,
  _ResponseTuple,
} from "./interfaces/types";
import { EventEmitter2 } from "eventemitter2";
//ここで選択できる
import storageClient from "./mongoDBClient";

//TODO:eventemitter継承する意味ある？
export default class tupleSpace extends EventEmitter2 {
  //FIXME:any型にしないで関数/クラスインスタンスの型をあとでちゃんと書く
  storage: storageClient;
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
  async write(writeTuple: _Tuple, callback: any): Promise<any> {
    this.storage.insert(writeTuple);
    this.emit("_writeData", writeTuple);
    //TODO:そのまま返してるだけになってる
    callback(writeTuple);
    return writeTuple;
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
