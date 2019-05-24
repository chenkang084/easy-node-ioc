"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./Container");
function Injectable(decoratorType) {
    return (target) => {
        const targetName = target.name;
        if (!Container_1.classPool.has(targetName)) {
            console.log(`=====inject ${targetName}=====`);
            Container_1.classPool.set(targetName, target);
        }
    };
}
exports.default = Injectable;
//# sourceMappingURL=Injectable.js.map