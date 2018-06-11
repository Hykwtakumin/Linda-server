import { EventEmitter2 } from "eventemitter2";
export class Emitter extends EventEmitter2 {
  constructor() {
    super();
    EventEmitter2.call(this);
  }
}
