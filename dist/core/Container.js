"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Constants_1 = require("./Constants");
exports.iocContainer = new WeakMap();
exports.classMap = new Map();
function Bootstrap(target) {
    const classInterator = exports.classMap.values();
    for (const $$class of classInterator) {
        const classDepends = Reflect.getOwnMetadataKeys($$class).filter((meta) => meta !== 'design:paramtypes');
        let classInstance = exports.iocContainer.get($$class);
        if (!exports.iocContainer.has($$class)) {
            classInstance = new $$class();
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
                        exports.iocContainer.set(_constructor, depInstance);
                    }
                    classInstance[prop] = depInstance;
                }
            });
    }
    const app = new target();
    const appDepends = Reflect.getOwnMetadataKeys(target).filter((meta) => meta !== 'design:paramtypes');
    appDepends.forEach((dep) => {
        const _constructor = Reflect.getMetadata(dep, target);
        const prop = dep.replace(Constants_1.autowired_reg, '');
        if (!exports.iocContainer.has(_constructor)) {
            app[prop] = new _constructor();
        }
        else {
            app[prop] = exports.iocContainer.get(_constructor);
        }
    });
    app.main();
}
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=Container.js.map