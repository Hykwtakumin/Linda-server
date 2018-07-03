import tupleSpace from "./tupleSpace";
import app from "./app";
//TODO:any型
let tupleSpaces: any = {};
const tupleSpaceCreater = (tupleSpaceName: string) => {
  if (tupleSpaces[tupleSpaceName]) {
    return tupleSpaces[tupleSpaceName];
  } else {
    tupleSpaces[tupleSpaceName] = new tupleSpace(tupleSpaceName);
    return tupleSpaces[tupleSpaceName];
  }
};
export default tupleSpaceCreater;
