import { _Memory } from "./interfaces/tuple-type";

let memoryDB: _Memory = {
  test: [{ _id: 0, time: Date.now(), type: "init" }],
};

export default memoryDB;
