"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const next = (err) => {
    if (err)
        return console.log('watch failed: ', err.message);
    console.log('watch successful!');
};
exports.default = next;
//# sourceMappingURL=errorHandler.js.map