"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBody = exports.Body = exports.PathVariable = exports.RequestParam = void 0;
const Constants_1 = require("./Constants");
const common_1 = require("../utils/common");
function CheckAndSetParameters(paramterName, parameterType) {
    return (target, propertyKey, parameterIndex) => {
        const restfulMap = common_1.getRestfulMap(`${Constants_1.RESTFUL}`, target);
        const method = target[propertyKey];
        const methodMap = common_1.getRestfulParameterMap(method, restfulMap);
        const parametersSet = common_1.getRestfulParameterSet(methodMap, parameterType);
        parametersSet.add(paramterName);
        methodMap.set(parameterType, parametersSet);
        if (!restfulMap.has(method)) {
            restfulMap.set(method, methodMap);
        }
        Reflect.defineMetadata(Constants_1.RESTFUL, restfulMap, target);
    };
}
function RequestParam(paramterName) {
    return CheckAndSetParameters(paramterName, 'query');
}
exports.RequestParam = RequestParam;
function PathVariable(paramterName) {
    return CheckAndSetParameters(paramterName, 'params');
}
exports.PathVariable = PathVariable;
function Body(paramterName) {
    return CheckAndSetParameters(paramterName, 'body');
}
exports.Body = Body;
function RequestBody(paramterName) {
    return CheckAndSetParameters(paramterName, 'RequestBody');
}
exports.RequestBody = RequestBody;
//# sourceMappingURL=ParameterDecorate.js.map