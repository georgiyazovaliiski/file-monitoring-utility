"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listener = (changeType, fullPath, currentStat, previousStat) => {
    switch (changeType) {
        case 'update':
            console.log('the file', fullPath, 'was updated', currentStat, previousStat);
            break;
        case 'create':
            console.log('the file', fullPath, 'was created', currentStat);
            break;
        case 'delete':
            console.log('the file', fullPath, 'was deleted', previousStat);
            break;
    }
};
exports.default = listener;
//# sourceMappingURL=fileUtils.js.map