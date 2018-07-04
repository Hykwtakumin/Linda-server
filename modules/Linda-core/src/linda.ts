import tupleSpace from "./tupleSpace";
// import * as url from "url";
import { Server } from "http";
import { _LindaOperation, _ResponseTuple } from "./interfaces/types";
//TODO:any型

export default class Linda {
  tupleSpaces: { [key: string]: tupleSpace };
  server: Server;
  tsNameFromURL: string;
  io: SocketIO.Server;
  constructor() {
    this.tupleSpaces = {};
  }
  tupleSpace(tupleSpaceName: string) {
    if (!this.tupleSpaces[tupleSpaceName]) {
      this.tupleSpaces[tupleSpaceName] = new tupleSpace(tupleSpaceName);
    }
    return this.tupleSpaces[tupleSpaceName];
  }
  listen(server: Server, io: SocketIO.Server) {
    console.log("linda-listening");
    //this.server = server;
    // this.server.on("request", (req: any, res: any) => {
    //   this.tsNameFromURL = url.parse(decodeURI(req.url)).pathname.split("/")[0];
    // });
    this.io = io;
    io.sockets.on("connection", (socket: SocketIO.Socket) => {
      let socketId: string = socket.id;
      socket.on("_read_operation", (data: _LindaOperation) => {
        this.tupleSpace(data._tsName).read(
          data._payload,
          (resData: _ResponseTuple) => {
            socket.to(socketId).emit("_read_response", resData);
          }
        );
      });
      socket.on("_write_operation", (data: _LindaOperation) => {
        this.tupleSpace(data._tsName).write(
          data._payload,
          (resData: _ResponseTuple) => {
            console.log(resData);
            socket.to(socketId).emit("_write_response", resData);
          }
        );
      });
      socket.on("_take_operation", (data: _LindaOperation) => {
        this.tupleSpace(data._tsName).take(
          data._payload,
          (resData: _ResponseTuple) => {
            socket.to(socketId).emit("_take_response", resData);
          }
        );
      });
      socket.on("_watch_operation", (data: _LindaOperation) => {
        console.log("tuple-watched:" + JSON.stringify(data));
        this.tupleSpace(data._tsName).watch(
          data._payload,
          (resData: _ResponseTuple) => {
            console.log("watch-data=" + JSON.stringify(resData));
            socket.emit("_watch_response", resData);
          }
        );
      });
    });
  }
}
