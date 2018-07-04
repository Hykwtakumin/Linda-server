import { _Memory } from "./interfaces/types";

let memoryDB: _Memory = {
  test: [{ _id: 0, time: Date.now(), type: "init" }],
};

export default memoryDB;
