"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../src");
const path_1 = require("path");
const express = require("express");
const http = require("http");
let App = class App {
    constructor() {
        this.app = express();
    }
    main() {
        const server = http.createServer(this.app);
        server.listen(9001, function () {
            console.log('Example app has started.');
        });
    }
};
App = tslib_1.__decorate([
    src_1.ComponentScan(path_1.join(__dirname, './Controller.js')),
    src_1.Bootstrap,
    tslib_1.__metadata("design:paramtypes", [])
], App);
//# sourceMappingURL=App.js.map