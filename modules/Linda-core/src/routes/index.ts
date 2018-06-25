import * as express from "express";
import tupleSpace from "../tupleSpace";
import storageClient from "../mongoDBClient";
import memoryDB from "../memoryDB";
const router: express.Router = express.Router();

router.get(
  "/:tupleSpaceName/:operation",
  async (req: express.Request, res: express.Response) => {
    const client = await new storageClient(req.params.tupleSpaceName);
    let ts = await new tupleSpace(client);
    //console.log(memoryDB);
    let resData;
    if (req.params.operation == "read") {
      resData = await ts.read(req.query);
    } else if (req.params.operation == "take") {
      resData = await ts.take(req.query);
    } else if (req.params.operation == "write") {
      resData = await ts.write(req.query);
    } else {
      resData = 'There is no operation like "' + req.params.operation + '"';
    }
    res.send(resData);
  }
);

router.get(
  "/:tupleSpaceName/",
  async (req: express.Request, res: express.Response) => {
    const client = new storageClient(req.params.tupleSpaceName);
    let ts = new tupleSpace(client);
    //console.log(memoryDB);
    let resData;
    res.send("tupleSpaceName = " + req.params.tupleSpaceName);
  }
);

router.post(
  "/:tupleSpaceName",
  (req: express.Request, res: express.Response) => {
    const client = new storageClient(req.params.tupleSpaceName);
    let ts: any = new tupleSpace(client);
    let resData = ts.write(req.body);
    res.send({ status: "ok", tuple: resData });
  }
);

export default router;
