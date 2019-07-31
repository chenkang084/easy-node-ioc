"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
const common_1 = require("../utils/common");
function RequestParam(requestParam) {
    return (target, propertyKey, parameterIndex) => {
        const restfulMap = common_1.getRestfulMap(`${Constants_1.RESTFUL}`, target);
        const method = target[propertyKey];
        const methodMap = common_1.getRestfulParameterMap(method, restfulMap);
        const parametersSet = common_1.getRestfulParameterSet(methodMap, 'query');
        parametersSet.add(requestParam);
        methodMap.set('query', parametersSet);
        if (!restfulMap.has(method)) {
            restfulMap.set(method, methodMap);
        }
        Reflect.defineMetadata(Constants_1.RESTFUL, restfulMap, target);
    };
}
exports.RequestParam = RequestParam;
function PathVariable(requestParam) {
    return (target, propertyKey, parameterIndex) => {
        const restfulMap = common_1.getRestfulMap(`${Constants_1.RESTFUL}`, target);
        const method = target[propertyKey];
        const methodMap = common_1.getRestfulParameterMap(method, restfulMap);
        const parametersSet = common_1.getRestfulParameterSet(methodMap, 'params');
        parametersSet.add(requestParam);
        methodMap.set('params', parametersSet);
        if (!restfulMap.has(method)) {
            restfulMap.set(method, methodMap);
        }
        Reflect.defineMetadata(Constants_1.RESTFUL, restfulMap, target);
    };
}
exports.PathVariable = PathVariable;
function Body(propName) {
    return (target, propertyKey, parameterIndex) => {
        const restfulMap = common_1.getRestfulMap(`${Constants_1.RESTFUL}`, target);
        const method = target[propertyKey];
        const methodMap = common_1.getRestfulParameterMap(method, restfulMap);
        const bodySet = common_1.getRestfulParameterSet(methodMap, 'body');
        bodySet.add(propName);
        methodMap.set('body', bodySet);
        if (!restfulMap.has(method)) {
            restfulMap.set(method, methodMap);
        }
        Reflect.defineMetadata(Constants_1.RESTFUL, restfulMap, target);
    };
}
exports.Body = Body;
//# sourceMappingURL=ParameterDecorate.js.map