"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const socketIo = require("socket.io");
const http_1 = require("http");
const linda_1 = require("./linda");
const index_1 = require("./routes/index");
dotenv.load();
const PORT = Number(process.env.PORT) || 3000;
const app = express();
const server = http_1.createServer(app);
const io = socketIo.listen(server);
const linda = new linda_1.default();
app.set("views", "views/");
app.set("view engine", "pug");
app.use(express.static("public/"));
linda.listen(server, io);
server.listen(PORT, () => {
    console.log("server listeninig at port:" + PORT);
});
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cookieParser());
//catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    err.status = 404;
    next(err);
});
//error handling
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
app.use("/", index_1.default);
app.set("linda", linda);
exports.default = app;
//# sourceMappingURL=app.js.map