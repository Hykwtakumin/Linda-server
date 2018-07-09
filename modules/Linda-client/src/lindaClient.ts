import * as io from "socket.io-client";
import {
  Tuple,
  Callback,
  ResponseTuple,
  ConnectCallback,
} from "./interfaces/index";

export default class LindaClient {
  socket: SocketIOClient.Socket;
  tupleSpaceName: string;
  constructor() {}

  async connect(url: string, callback: ConnectCallback) {
    if (this.validateURL(url)) {
      this.socket = await io(url);
      this.tupleSpaceName = url.split("/")[3];
      callback();
    } else {
      throw "cannot parse URL";
    }
  }

  read(tuple: Tuple, callback: Callback) {
    let readData = { _tsName: this.tupleSpaceName, _payload: tuple };
    this.socket.on("_read_response", (resData: ResponseTuple) => {
      callback(resData);
    });
    this.socket.emit("_read_operation", readData);
  }

  write(tuple: Tuple, callback: Callback) {
    let writeData = { _tsName: this.tupleSpaceName, _payload: tuple };
    this.socket.on("_write_response", (resData: ResponseTuple) => {
      callback(resData);
    });
    this.socket.emit("_write_operation", writeData);
  }

  take(tuple: Tuple, callback: Callback) {
    let takeData = { _tsName: this.tupleSpaceName, _payload: tuple };
    this.socket.on("_take_response", (resData: ResponseTuple) => {
      callback(resData);
    });
    this.socket.emit("_take_operation", takeData);
  }
  watch(tuple: Tuple, callback: Callback) {
    let watchData = { _tsName: this.tupleSpaceName, _payload: tuple };
    this.socket.on("_watch_response", (resData: ResponseTuple) => {
      callback(resData);
    });
    this.socket.emit("_watch_operation", watchData);
  }
  private validateURL(url: string): boolean {
    const regex = /^(http|https):\/\/([\w-]+\.)+[\w-]+\/[\w-]+/;
    return regex.test(url);
  }
}
