"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./Container");
function Injectable() {
    return (target) => {
        const targetName = target.name;
        if (!Container_1.classPool.has(targetName)) {
            console.log(`=====inject ${targetName}=====`);
            Container_1.classPool.set(targetName, target);
        }
    };
}
function Component() {
    return Injectable();
}
exports.Component = Component;
function Service() {
    return Injectable();
}
exports.Service = Service;
function Controller(path) {
    return Injectable();
}
exports.Controller = Controller;
//# sourceMappingURL=ClassInject.js.map