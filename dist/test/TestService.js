"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ClassInject_1 = require("../core/ClassInject");
let TestService = class TestService {
    constructor() {
        console.log('constructor service');
    }
    query() {
        console.log('execuate query');
    }
};
TestService = tslib_1.__decorate([
    ClassInject_1.Service(),
    tslib_1.__metadata("design:paramtypes", [])
], TestService);
exports.default = TestService;
//# sourceMappingURL=TestService.js.map