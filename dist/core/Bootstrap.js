"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const Constants_1 = require("./Constants");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
exports.iocContainer = new WeakMap();
exports.controlSet = new Set();
function recurInject(target) {
    const targetInstance = new target();
    logger_1.default.info(`instantiate ${target.name}`);
    const depends = Reflect.getOwnMetadataKeys(target).filter((meta) => 'design:paramtypes' !== meta);
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
        if (depClass.match(Constants_1.control_reg)) {
            exports.controlSet.add(target);
        }
    });
    exports.iocContainer.set(target, targetInstance);
    return targetInstance;
}
function Bootstrap(target) {
    logger_1.default.info(' tool start to instantaiate class');
    recurInject(target);
    const expressInstance = exports.iocContainer.get(target);
    for (const control of exports.controlSet) {
        const controlInstance = exports.iocContainer.get(control);
        const metas = Reflect.getMetadataKeys(controlInstance);
        const controlPath = Reflect.getMetadata(Constants_1.CONTROL, control);
        metas
            .filter((meta) => meta.match(Constants_1.restful_reg))
            .forEach((restful) => {
            const restInfo = restful.split('@@');
            const methodType = restInfo[2];
            const methodPath = restInfo[3];
            const method = Reflect.getMetadata(restful, controlInstance);
            logger_1.default.info(`easy-ioc inject controller:${control.name}`);
            expressInstance.app[methodType](controlPath + methodPath, method.value.bind(controlInstance));
        });
    }
    logger_1.default.info('easy-ioc tool instantaiate all class completely.');
    expressInstance.main();
}
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=Bootstrap.js.map