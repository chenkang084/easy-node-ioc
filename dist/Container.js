"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Constants_1 = require("./Constants");
exports.containers = new WeakMap();
exports.classPool = new Map();
function instanceClass(_constructor) {
    if (exports.containers.has(_constructor)) {
        return exports.containers.get(_constructor);
    }
    const paramsTypes = Reflect.getMetadata('design:paramtypes', _constructor);
    const paramInstances = paramsTypes &&
        paramsTypes.map(dependConstruct => {
            if (dependConstruct.length) {
                return instanceClass(dependConstruct);
            }
            else {
                if (exports.containers.has(dependConstruct)) {
                    return exports.containers.get(dependConstruct);
                }
                else {
                    const instance = new dependConstruct();
                    exports.containers.set(dependConstruct, instance);
                    return instance;
                }
            }
        });
    const instance = new _constructor(...paramInstances);
    exports.containers.set(_constructor, instance);
    return instance;
}
exports.instanceClass = instanceClass;
class App {
    main() { }
}
exports.App = App;
function Bootstrap(target) {
    for (const item of exports.classPool.values()) {
        const depends = Reflect.getOwnMetadataKeys(item).filter((meta) => meta !== 'design:paramtypes');
        let instance = exports.containers.get(item);
        if (!exports.containers.has(item)) {
            instance = new item();
            exports.containers.set(item, instance);
        }
        depends &&
            depends.forEach((meta) => {
                if (meta.match(Constants_1.autowired_reg)) {
                    const _constructor = Reflect.getMetadata(meta, item);
                    const prop = meta.replace(Constants_1.autowired_reg, '');
                    let depInstance = exports.containers.get(_constructor);
                    if (!exports.containers.has(_constructor)) {
                        depInstance = new _constructor();
                        exports.containers.set(_constructor, depInstance);
                    }
                    instance[prop] = depInstance;
                }
            });
    }
    const app = new target();
    const appDepends = Reflect.getOwnMetadataKeys(target).filter((meta) => meta !== 'design:paramtypes');
    appDepends.forEach((dep) => {
        const _constructor = Reflect.getMetadata(dep, target);
        const prop = dep.replace(Constants_1.autowired_reg, '');
        if (!exports.containers.has(_constructor)) {
            app[prop] = new _constructor();
        }
        else {
            app[prop] = exports.containers.get(_constructor);
        }
    });
    app.main();
}
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=Container.js.map