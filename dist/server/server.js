"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const player_1 = require("../shared/model/player");
const app = express_1.default();
app.set("port", process.env.PORT || 9001);
let http = require("http").Server(app);
let io = require("socket.io")(http);
app.use(express_1.default.static(path_1.default.join(__dirname, "../client")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve("./src/client/index.html"));
});
io.on("connection", function (socket) {
    console.log("Client connected!");
    socket.on("msg", function (msg) {
        let player = new player_1.Player(msg);
        console.log(player.getName());
    });
});
http.listen(9001, function () {
    console.log("listening on *:9001");
});
//# sourceMappingURL=server.js.map