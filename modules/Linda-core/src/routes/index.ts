import * as express from "express";
import tupleSpaces from "../tupleSpaces";
import tupleSpace from "../tupleSpace";
//import { _TupleSpace } from "../interfaces/tuple-type";
const router: express.Router = express.Router();

router.get(
  "/:tupleSpaceName",
  (req: express.Request, res: express.Response) => {
    let ts: any;
    if (tupleSpaces[req.params.tupleSpaceName]) {
      ts = tupleSpaces[req.params.tupleSpaceName];
    } else {
      ts = new tupleSpace(req.params.tupleSpaceName);
      tupleSpaces[req.params.tupleSpaceName] = ts;
    }
    res.send(ts);
  }
);

router.post(
  "/:tupleSpaceName",
  (req: express.Request, res: express.Response) => {
    let ts: any;
    if (tupleSpaces[req.params.tupleSpaceName]) {
      ts = tupleSpaces[req.params.tupleSpaceName];
    } else {
      ts = new tupleSpace(req.params.tupleSpaceName);
      tupleSpaces[req.params.tupleSpaceName] = ts;
    }

    ts.write(req.body);
    res.send({ status: "ok", tuple: req.body });
  }
);

export default router;
