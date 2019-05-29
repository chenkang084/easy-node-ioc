"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
function Get(path) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(`${Constants_1.RESTFUL}@@get@@${path}`, descriptor, target);
    };
}
exports.Get = Get;
//# sourceMappingURL=MethodInject.js.map