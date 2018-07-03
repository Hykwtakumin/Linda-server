const events = require("eventemitter2");

class Emitter1 extends events.EventEmitter2 {
  emitTest() {
    this.emit("test", "message from emitter1");
  }

  listenTest() {
    console.log("Emitter1 listening");
    this.on("test", mes => {
      console.log(mes);
    });
  }
}

class Emitter2 extends events.EventEmitter2 {
  emitTest() {
    this.emit("test", "message from emitter2");
  }

  listenTest() {
    console.log("Emitter2 listening");
    this.on("test", mes => {
      console.log(mes);
    });
  }
}

const em1 = new Emitter1();
const em2 = new Emitter1();

em1.on("test", mes => {
  console.log(mes);
});
em2.on("test", mes => {
  console.log(mes);
});

setTimeout(() => {
  em1.emit("test", "message from emitter1");
  setTimeout(() => {
    em2.emit("test", "message from emitter2");
  }, 1000);
}, 1000);
