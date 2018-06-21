import { EventEmitter2 } from "eventemitter2";
// export class Emitter extends EventEmitter2 {
//   constructor() {
//     super();
//     EventEmitter2.call(this);
//   }
// }
const Emitter = new EventEmitter2({
  wildcard: true,
  delimiter: "::",
  newListener: false,
  maxListeners: 20,
  verboseMemoryLeak: false,
});

export default Emitter;
