"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//quick change
var app_1 = __importDefault(require("./app"));
var http_1 = __importDefault(require("http"));
var config_1 = __importDefault(require("./utils/config"));
var server = http_1.default.createServer(app_1.default);
server.listen(config_1.default.PORT, function () {
    console.log("Server running on port ".concat(config_1.default.PORT));
});
