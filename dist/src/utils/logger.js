"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env['NODE_ENV'] || 'production';
const logger = {
    error: (...args) => {
        console.error.apply(console, args);
    },
    info: (...args) => {
        if (env === 'development') {
            args.unshift('easy-ioc:');
            console.info.apply(console, args);
        }
    }
};
exports.default = logger;
//# sourceMappingURL=logger.js.map