"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = require("../");
const Controller_1 = tslib_1.__importDefault(require("./Controller"));
const express = require("express");
const http = require("http");
let App = class App {
    constructor() {
        this.app = express();
    }
    main() {
        const server = http.createServer(this.app);
        server.listen(9001, function () {
            console.log('Example app listening at http://%s:%s');
        });
    }
};
tslib_1.__decorate([
    __1.Autowired,
    tslib_1.__metadata("design:type", Controller_1.default)
], App.prototype, "testControl", void 0);
App = tslib_1.__decorate([
    __1.Bootstrap
], App);
//# sourceMappingURL=TestApp.js.map