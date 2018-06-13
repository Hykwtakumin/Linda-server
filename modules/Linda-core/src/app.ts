import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
dotenv.load();

import routeIndex from "./routes/index";

const PORT: number = Number(process.env.PORT) || 3000;

const app: express.Express = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieParser());

app.use("/", routeIndex);

app.listen(PORT, () => {
  console.log("server listeninig at port:" + PORT);
});
