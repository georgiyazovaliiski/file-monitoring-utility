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
Object.defineProperty(exports, "__esModule", { value: true });
const changeLog_1 = require("../models/changeLog");
class LogsService {
    static add(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return changeLog_1.ChangeLog.create(model);
        });
    }
    static remove(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return changeLog_1.ChangeLog.destroy({ where: model });
        });
    }
    static update(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return changeLog_1.ChangeLog.update({ model }, { where: { itemPath: model.itemPath } });
        });
    }
    static get(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return changeLog_1.ChangeLog.findAll({ where: model });
        });
    }
}
exports.default = LogsService;
//# sourceMappingURL=logsService.js.map