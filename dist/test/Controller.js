"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = require("../");
const Service_1 = tslib_1.__importDefault(require("./Service"));
const DbService_1 = tslib_1.__importDefault(require("./DbService"));
let TestControl = class TestControl {
    constructor() {
        this.index = (req, res, next) => {
            console.log('index method');
            this.dbService.queryDb();
            res.status(200).send(this.testService.queryDb());
        };
        this.index.bind(this);
    }
    index2(req, res, next) {
        console.log('index method');
        this.dbService.queryDb();
        res.status(200).send(this.testService.queryDb());
    }
    test() {
        console.log('control test method');
    }
};
tslib_1.__decorate([
    __1.Autowired,
    tslib_1.__metadata("design:type", Service_1.default)
], TestControl.prototype, "testService", void 0);
tslib_1.__decorate([
    __1.Autowired,
    tslib_1.__metadata("design:type", DbService_1.default)
], TestControl.prototype, "dbService", void 0);
TestControl = tslib_1.__decorate([
    __1.Controller(''),
    tslib_1.__metadata("design:paramtypes", [])
], TestControl);
exports.default = TestControl;
//# sourceMappingURL=Controller.js.map