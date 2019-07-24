"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Constants_1 = require("./Constants");
function Autowired(target, propKey) {
    const _constructor = Reflect.getMetadata('design:type', target, propKey);
    Reflect.defineMetadata(`${Constants_1.AUTOWIRED}@@${propKey}`, _constructor, target.constructor);
}
exports.Autowired = Autowired;
//# sourceMappingURL=PropInject.js.map