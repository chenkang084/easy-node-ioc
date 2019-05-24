"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Get(path) {
    return decoratorRoutes('get', path);
}
exports.Get = Get;
function decoratorRoutes(requestType, requstPath) {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        const middlewares = originalMethod.middlewares || undefined;
        descriptor.value = originalMethod;
        descriptor.value.routeProperties = {
            requestType,
            middlewares,
            requstPath: requstPath ? requstPath : ''
        };
        const t3 = Reflect.getMetadata('design:returntype', target.constructor, propertyKey);
        const t2 = Reflect.getMetadata('design:paramtypes', target, propertyKey);
        console.log();
        return descriptor;
    };
}
//# sourceMappingURL=Methods.js.map