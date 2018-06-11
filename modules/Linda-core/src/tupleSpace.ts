import { _Tuples, _Tuple, _SearchTuple } from "./interfaces/tuple-type";
import { Emitter } from "./eventEmitter";
const emitter = new Emitter();

export class tupleSpace {
  tuples: _Tuples;
  name: string;
  constructor(tupleSpaceName: string) {
    this.tuples = [{ id: "init", time: Number(Date.now), type: "init" }];
    this.name = tupleSpaceName;
    emitter.emit("newTuple");
  }
  write(writeTuple: _Tuple): number {
    this.tuples.push(writeTuple);
    return this.tuples.length;
  }
  read(searchTuple: _SearchTuple): _Tuple {
    return;
  }
  watch(watchTuple: _SearchTuple): _Tuple {
    return;
  }
  take(takeTuple: _SearchTuple): _Tuple {
    return;
  }
}

export { emitter };
