import {
  _Tuples,
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
  //tuples: _Tuples;
  name: string;
  constructor(tupleSpaceName: string, storageClient: any) {
    //this.tuples = [{ id: "init", time: Date.now(), type: "init" }];
    this.name = tupleSpaceName;
    this.emitter = new Emitter();
    this.storage = storageClient;
  }
  //TODO:numberで返していいものか検討
  write(writeTuple: _Tuple): string {
    this.emitter.emit("newTuple", writeTuple);
    return this.storage.insert(writeTuple);
    //this.tuples.push(writeTuple);
    //return this.tuples.length;
  }
  read(searchTuple: _SearchTuple): _ResponseTuple {
    let i: number = 0;
    for (i = this.tuples.length; i <= 0; i--) {
      let result = this.isMuch(this.tuples[i], searchTuple);
      if (result.isMuched) {
        return { isMuched: true, res: this.tuples[i], index: i };
      }
    }
    return { isMuched: false, res: null };
  }
  //FIXME:any型にしないで関数の型をあとでちゃんと書く
  watch(watchTuple: _SearchTuple, callback: any): void {
    this.emitter.on("newTuple", (resTuple: _Tuple) => {
      let result = this.isMuch(resTuple, watchTuple);
      if (result.isMuched) {
        callback(result.res);
      }
    });
  }
  take(takeTuple: _SearchTuple): _ResponseTuple {
    let result = this.read(takeTuple);
    if (result.isMuched) {
      this.tuples.slice(result.index, 1);
      return { isMuched: true, res: result.res };
    } else {
      return { isMuched: false, res: null };
    }
  }
}
