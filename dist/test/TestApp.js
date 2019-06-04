"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = require("../");
const express = require("express");
const http = require("http");
let App = class App {
    constructor() {
        this.app = express();
        require('./Controller');
    }
    main() {
        const server = http.createServer(this.app);
        server.listen(9001, function () {
            console.log('Example app listening at http://%s:%s');
        });
    }
};
App = tslib_1.__decorate([
    __1.Bootstrap,
    tslib_1.__metadata("design:paramtypes", [])
], App);
//# sourceMappingURL=TestApp.js.map