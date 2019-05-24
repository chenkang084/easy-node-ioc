"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = require("../");
const TestController_1 = tslib_1.__importDefault(require("./TestController"));
const TestService_1 = tslib_1.__importDefault(require("./TestService"));
let MyApp = class MyApp {
    main() {
        console.log('start app');
        this.testControl.testService.query();
        this.testService.query();
    }
};
tslib_1.__decorate([
    __1.Autowired,
    tslib_1.__metadata("design:type", TestController_1.default)
], MyApp.prototype, "testControl", void 0);
tslib_1.__decorate([
    __1.Autowired,
    tslib_1.__metadata("design:type", TestService_1.default)
], MyApp.prototype, "testService", void 0);
MyApp = tslib_1.__decorate([
    __1.Bootstrap
], MyApp);
//# sourceMappingURL=TestApp.js.map