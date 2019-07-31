"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRestfulMap(key, target) {
    let restfulMap = Reflect.getMetadata(key, target);
    if (!restfulMap) {
        restfulMap = new WeakMap();
    }
    return restfulMap;
}
exports.getRestfulMap = getRestfulMap;
function getRestfulParameterMap(key, map) {
    let parameterMap = map.get(key);
    if (!parameterMap) {
        parameterMap = new Map();
    }
    return parameterMap;
}
exports.getRestfulParameterMap = getRestfulParameterMap;
function getRestfulParameterSet(map, type) {
    let set = map.get(type);
    if (!set) {
        set = new Set();
    }
    return set;
}
exports.getRestfulParameterSet = getRestfulParameterSet;
function getFunctionParams(method) {
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    const ARGUMENT_NAMES = /([^\s,]+)/g;
    const fnStr = method.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr
        .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
        .match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
}
exports.getFunctionParams = getFunctionParams;
//# sourceMappingURL=common.js.map