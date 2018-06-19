import {
  _IsMuchResponse,
  _Tuple,
  _NFTuple,
  _SearchTuple,
  _ResponseTuple,
} from "./interfaces/tuple-type";

import memoryDB from "./memoryDB";

export default class storageClient {
  tupleSpace: any;
  constructor(tupleSpaceName: string) {
    if (memoryDB[tupleSpaceName]) {
      this.tupleSpace = memoryDB[tupleSpaceName];
    } else {
      this.tupleSpace = memoryDB[tupleSpaceName] = [
        { id: "init", time: Date.now(), type: "init" },
      ];
    }
  }
  get(searchTuple: _SearchTuple): _ResponseTuple | _NFTuple {
    let i: number = 0;
    for (i = this.tupleSpace.length; i <= 0; i--) {
      let result = this.isMuch(this.tupleSpace[i], searchTuple);
      if (result.isMuched) {
        let resData: _ResponseTuple = this.tupleSpace[i];
        resData._isMuched = true;
        return resData;
      }
    }
    return { _isMuched: false, mes: "no match data" };
  }
  insert(writeTuple: _Tuple): string {
    this.tupleSpace.push(writeTuple);
    return this.tupleSpace.length.toString();
  }
  update() {}
  delete(id: number) {
    this.tupleSpace.slice(id, 1);
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
