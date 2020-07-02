"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logsService_1 = __importDefault(require("../services/logsService"));
const listener = (changeType, fullPath, currentStat, previousStat) => __awaiter(void 0, void 0, void 0, function* () {
    switch (changeType) {
        case 'update':
            console.log('the file', fullPath, 'was updated', currentStat, previousStat);
            yield logsService_1.default.update({ itemPath: fullPath, itemName: fullPath.split('[/\\]').reverse()[0] });
            break;
        case 'create':
            console.log('the file', fullPath, 'was created', currentStat);
            yield logsService_1.default.add({ itemPath: fullPath, itemName: fullPath.split('/').reverse()[0] });
            break;
        case 'delete':
            console.log('the file', fullPath, 'was deleted', previousStat);
            yield logsService_1.default.remove({ itemPath: fullPath });
            break;
    }
    console.log('==============');
    console.log(yield logsService_1.default.get({}));
});
exports.default = listener;
//# sourceMappingURL=fileUtils.js.map