"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const __1 = require("../");
let DbService = class DbService {
    queryDb() {
        console.log('DbService class queryDb method');
        return 'ok';
    }
};
DbService = tslib_1.__decorate([
    __1.Service()
], DbService);
exports.default = DbService;
//# sourceMappingURL=DbService.js.map