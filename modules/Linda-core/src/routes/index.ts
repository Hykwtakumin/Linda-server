import * as express from "express";
//import tupleSpace from "../tupleSpace";
//import storageClient from "../mongoDBClient";
const router: express.Router = express.Router();
import { ResponseTuple, InsertOneWriteOpResult } from "../interfaces";
//import { sc } from "../app";
//import { ioSocket } from "../app";
import app from "../app";
router.get(
  "/:tupleSpaceName/:operation",
  (req: express.Request, res: express.Response) => {
    const linda = app.get("linda");
    let ts = linda.tupleSpace(req.params.tupleSpaceName);
    let resData = 'There is no operation like "' + req.params.operation + '"';
    if (req.params.operation == "read") {
      ts.read(req.query, (Data: ResponseTuple) => {
        res.send(Data);
      });
    } else if (req.params.operation == "take") {
      ts.take(req.query, (Data: ResponseTuple) => {
        res.send(Data);
      });
    } else if (req.params.operation == "write") {
      ts.write(req.query, (Data: InsertOneWriteOpResult) => {
        res.send(Data);
      });
    } else {
      res.send(resData);
    }
  }
);

router.get(
  "/:tupleSpaceName/",
  (req: express.Request, res: express.Response) => {
    res.send("tupleSpaceName = " + req.params.tupleSpaceName);
  }
);

router.post(
  "/:tupleSpaceName",
  (req: express.Request, res: express.Response) => {
    // const client = new storageClient(req.params.tupleSpaceName);
    // let ts: any = new tupleSpace(client);
    const linda = app.get("linda");
    let ts = linda.tupleSpace(req.params.tupleSpaceName);
    let resData = ts.write(req.body);
    res.send({ status: "ok", tuple: resData });
  }
);

export default router;
