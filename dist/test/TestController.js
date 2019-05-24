"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ClassInject_1 = require("../core/ClassInject");
const PropInject_1 = require("../core/PropInject");
const TestService_1 = tslib_1.__importDefault(require("./TestService"));
let TestControl = class TestControl {
    constructor(test) {
        console.log('constructor TestControl');
    }
    indexPage(test) {
        this.testService.query();
    }
};
tslib_1.__decorate([
    PropInject_1.Autowired,
    tslib_1.__metadata("design:type", TestService_1.default)
], TestControl.prototype, "testService", void 0);
TestControl = tslib_1.__decorate([
    ClassInject_1.Controller('/test'),
    tslib_1.__metadata("design:paramtypes", [String])
], TestControl);
exports.default = TestControl;
//# sourceMappingURL=TestController.js.map