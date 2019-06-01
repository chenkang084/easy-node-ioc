"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
const common_1 = require("../utils/common");
function Get(path) {
    return function (target, propertyKey, descriptor) {
        const restfulMap = common_1.getRestfulMap(`${Constants_1.RESTFUL}`, target);
        const method = target[propertyKey];
        const methodMap = common_1.getRestfulParameterMap(method, restfulMap);
        methodMap.set('path', path);
        methodMap.set('methodType', 'get');
        methodMap.set('args', common_1.getFunctionParams(method).filter(arg => !['req', 'res', 'next'].includes(arg)));
        if (!restfulMap.has(method)) {
            restfulMap.set(method, methodMap);
        }
        Reflect.defineMetadata(Constants_1.RESTFUL, restfulMap, target);
    };
}
exports.Get = Get;
//# sourceMappingURL=MethodInject.js.map