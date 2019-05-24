"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ClassInject_1 = require("./ClassInject");
const Container_1 = require("./Container");
const PropInject_1 = require("./PropInject");
const Methods_1 = require("./Methods");
require("reflect-metadata");
let TestService = class TestService {
    constructor() {
        console.log('service');
    }
    query() {
        console.log('execuate query');
    }
};
TestService = tslib_1.__decorate([
    ClassInject_1.Service(),
    tslib_1.__metadata("design:paramtypes", [])
], TestService);
let TestControl = class TestControl {
    constructor(test) {
        console.log('TestControl');
    }
    indexPage(test) {
        this.testService.query();
    }
};
tslib_1.__decorate([
    PropInject_1.Autowired,
    tslib_1.__metadata("design:type", TestService)
], TestControl.prototype, "testService", void 0);
tslib_1.__decorate([
    Methods_1.Get('/test'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], TestControl.prototype, "indexPage", null);
TestControl = tslib_1.__decorate([
    ClassInject_1.Controller('/test'),
    tslib_1.__metadata("design:paramtypes", [String])
], TestControl);
let MyApp = class MyApp {
    main() {
        console.log('start app');
        this.testControl.testService.query();
    }
};
tslib_1.__decorate([
    PropInject_1.Autowired,
    tslib_1.__metadata("design:type", TestControl)
], MyApp.prototype, "testControl", void 0);
MyApp = tslib_1.__decorate([
    Container_1.Bootstrap
], MyApp);
//# sourceMappingURL=TestApp.js.map