"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const Constants_1 = require("./Constants");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
exports.iocContainer = new WeakMap();
exports.classMap = new Map();
function Bootstrap(target) {
    logger_1.default.info('easy-ioc: tool start to instantaiate class');
    const classInterator = exports.classMap.values();
    for (const $$class of classInterator) {
        const classDepends = Reflect.getOwnMetadataKeys($$class).filter((meta) => meta !== 'design:paramtypes');
        let classInstance = exports.iocContainer.get($$class);
        if (!exports.iocContainer.has($$class)) {
            classInstance = new $$class();
            logger_1.default.info(`easy-ioc: instantiate ${$$class.name}`);
            exports.iocContainer.set($$class, classInstance);
        }
        classDepends &&
            classDepends.forEach((depClass) => {
                if (depClass.match(Constants_1.autowired_reg)) {
                    const _constructor = Reflect.getMetadata(depClass, $$class);
                    const prop = depClass.replace(Constants_1.autowired_reg, '');
                    let depInstance = exports.iocContainer.get(_constructor);
                    if (!exports.iocContainer.has(_constructor)) {
                        depInstance = new _constructor();
                        logger_1.default.info(`easy-ioc: instantiate ${_constructor.name}`);
                        exports.iocContainer.set(_constructor, depInstance);
                    }
                    classInstance[prop] = depInstance;
                }
            });
    }
    const app = new target();
    logger_1.default.info(`easy-ioc: instantiate ${target.name}`);
    const appDepends = Reflect.getOwnMetadataKeys(target).filter((meta) => meta !== 'design:paramtypes');
    appDepends.forEach((appDep) => {
        const depClass = Reflect.getMetadata(appDep, target);
        const prop = appDep.replace(Constants_1.autowired_reg, '');
        let depInstance = exports.iocContainer.get(depClass);
        if (!exports.iocContainer.has(depClass)) {
            depInstance = new depClass();
            logger_1.default.info(`easy-ioc: instantiate ${depClass.name}`);
        }
        app[prop] = depInstance;
    });
    logger_1.default.info('easy-ioc: tool instantaiate all class completely.');
    app.main();
}
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=Bootstrap.js.map