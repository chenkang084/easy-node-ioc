"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../src");
let TestService = class TestService {
    queryDb() {
        console.log('TestService class queryDb method');
        return 'ok';
    }
};
TestService = tslib_1.__decorate([
    src_1.Service()
], TestService);
exports.default = TestService;
//# sourceMappingURL=Service.js.map