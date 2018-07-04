import {
  _IsMuchResponse,
  _Tuple,
  _NFTuple,
  _SearchTuple,
  _ResponseTuple,
} from "./interfaces/types";

import memoryDB from "./memoryDB";

export default class storageClient {
  tupleSpace: any;
  constructor(tupleSpaceName: string) {
    if (memoryDB[tupleSpaceName]) {
      this.tupleSpace = memoryDB[tupleSpaceName];
      console.log(tupleSpaceName + " is already exist");
    } else {
      this.tupleSpace = memoryDB[tupleSpaceName] = [
        { _id: 0, time: Date.now(), type: "init" },
      ];
      console.log(tupleSpaceName + " is created");
    }
  }
  // .map使って書き直せる説
  get(searchTuple: _SearchTuple): _ResponseTuple | _NFTuple {
    let i: number;
    for (i = this.tupleSpace.length; i > 0; i--) {
      let result = this.isMuch(this.tupleSpace[i - 1], searchTuple);
      if (result.isMuched) {
        let resData: _ResponseTuple = this.tupleSpace[i - 1];
        resData._isMuched = true;
        return resData;
      }
    }
    if (i == 0) {
      return { _isMuched: false, mes: "no match data" };
    }
  }

  insert(writeTuple: _Tuple): _Tuple {
    writeTuple._id = this.tupleSpace.length;
    writeTuple.time = Date.now();
    this.tupleSpace.push(writeTuple);
    return writeTuple;
  }
  //update() {}
  delete(id: number): void {
    console.log(id);
    //console.log("this tupleSpace:" + JSON.stringify(this.tupleSpace));
    this.tupleSpace.splice(id, 1);
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
