import {
  _Tuples,
  _Tuple,
  _SearchTuple,
  _ResponseTuple,
} from "./interfaces/tuple-type";

import memoryDB from "./memoryDB";

export default class storageClient {
  constructor(tupleSpaceName: string) {}
  get(searchTuple: _SearchTuple): _Tuple {
    return;
  }
  insert(writeTuple: _Tuple): string {
    memoryDB.push;
    return "id";
  }
  update() {}
  delete() {}

  private isMuch(
    targetTuple: _Tuple,
    searchTuple: _SearchTuple
  ): _ResponseTuple {
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
