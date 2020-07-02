"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeLog = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../db/database"));
class ChangeLog extends sequelize_1.Model {
}
exports.ChangeLog = ChangeLog;
ChangeLog.init({
    itemName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    itemPath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    timestamps: true,
    createdAt: false,
    updatedAt: 'updateTimestamp'
});
//# sourceMappingURL=changeLog.js.map