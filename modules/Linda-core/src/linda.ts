import tupleSpace from "./tupleSpace";
import * as url from "url";
//TODO:any型

export default class Linda {
  tupleSpaces: any;
  server: any;
  tsNameFromURL: string;
  io: any;
  constructor() {
    this.tupleSpaces = {};
  }
  tupleSpace(tupleSpaceName: string) {
    if (!this.tupleSpaces[tupleSpaceName]) {
      this.tupleSpaces[tupleSpaceName] = new tupleSpace(tupleSpaceName);
    }
    return this.tupleSpaces[tupleSpaceName];
  }
  listen(server: any, io: any) {
    console.log("linda-listening");
    this.server = server;
    this.server.on("request", (req: any, res: any) => {
      this.tsNameFromURL = url.parse(decodeURI(req.url)).pathname.split("/")[0];
    });
    this.io = io;
    io.sockets.on("connection", (socket: any) => {
      let socketId = socket.id;
      socket.on("_read_operation", (data: any) => {
        this.tupleSpace(data.tsName).read(data.payload, (resData: any) => {
          socket.to(socketId).emit("_read_response", resData);
        });
      });
      socket.on("_write_operation", (data: any) => {
        console.log("tuple-writed:" + JSON.stringify(data));
        this.tupleSpace(data.tsName).write(data.payload, (resData: any) => {
          console.log(resData);
          socket.emit("_write_response", resData);
        });
      });
      socket.on("_take_operation", (data: any) => {
        this.tupleSpace(data.tsName).take(data.payload, (resData: any) => {
          socket.to(socketId).emit("_take_response", resData);
        });
      });
      socket.on("_watch_operation", (data: any) => {
        console.log("tuple-watched:" + JSON.stringify(data));
        this.tupleSpace(data.tsName).watch(data.payload, (resData: any) => {
          console.log("watch-data=" + JSON.stringify(resData));
          socket.emit("_watch_response", resData);
        });
      });
    });
  }
}
