"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const Constants_1 = require("./Constants");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
exports.iocContainer = new WeakMap();
exports.classMap = new Map();
function recurInject(target) {
    const targetInstance = new target();
    logger_1.default.info(`instantiate ${target.name}`);
    Object.getOwnPropertyNames(targetInstance.__proto__)
        .filter((prop) => prop !== 'constructor')
        .forEach((prop) => {
        const method = targetInstance.__proto__[prop];
        targetInstance.__proto__[prop] = method.bind(targetInstance);
    });
    const depends = Reflect.getOwnMetadataKeys(target).filter((meta) => meta !== 'design:paramtypes');
    depends.forEach((depClass) => {
        if (depClass.match(Constants_1.autowired_reg)) {
            const _constructor = Reflect.getMetadata(depClass, target);
            const prop = depClass.replace(Constants_1.autowired_reg, '');
            let depInstance = exports.iocContainer.get(_constructor);
            if (!exports.iocContainer.has(_constructor)) {
                depInstance = recurInject(_constructor);
            }
            targetInstance[prop] = depInstance;
            logger_1.default.info(` add prop [${prop}]: to ${target.name}`);
        }
    });
    exports.iocContainer.set(target, targetInstance);
    return targetInstance;
}
function Bootstrap(target) {
    logger_1.default.info(' tool start to instantaiate class');
    recurInject(target);
    const app = exports.iocContainer.get(target);
    logger_1.default.info(' tool instantaiate all class completely.');
    app.main();
}
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=Bootstrap.js.map