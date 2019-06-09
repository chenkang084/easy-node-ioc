"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Constants_1 = require("./Constants");
const common_1 = require("../utils/common");
const multer_1 = tslib_1.__importDefault(require("multer"));
const upload = multer_1.default();
function Get(path) {
    return handleRequest('get', path);
}
exports.Get = Get;
function Post(path) {
    return handleRequest('post', path);
}
exports.Post = Post;
function Put(path) {
    return handleRequest('put', path);
}
exports.Put = Put;
function Delete(path) {
    return handleRequest('delete', path);
}
exports.Delete = Delete;
function Patch(path) {
    return handleRequest('patch', path);
}
exports.Patch = Patch;
function handleRequest(reqType, path) {
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
function Multer(target, propertyKey, descriptor) {
    const restfulMap = common_1.getRestfulMap(`${Constants_1.RESTFUL}`, target);
    const method = target[propertyKey];
    const methodMap = common_1.getRestfulParameterMap(method, restfulMap);
    let middleWareSet = methodMap.get(Constants_1.MIDDLEWARE);
    if (!middleWareSet) {
        middleWareSet = new Set();
    }
    middleWareSet.add(upload.any());
    methodMap.set(Constants_1.MIDDLEWARE, middleWareSet);
    if (!restfulMap.has(method)) {
        restfulMap.set(method, methodMap);
    }
    Reflect.defineMetadata(Constants_1.RESTFUL, restfulMap, target);
}
exports.Multer = Multer;
//# sourceMappingURL=MethodInject.js.map