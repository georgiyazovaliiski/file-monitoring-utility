import {DataTypes, Model} from "sequelize";
import sequelize from "../db/database";

export class ChangeLog extends Model{
    public itemName:string
    public itemPath:string
}

ChangeLog.init({
    itemName: {
        type:DataTypes.STRING,
        allowNull:false
    },
    itemPath: {
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    timestamps:true,
    createdAt:false,
    updatedAt: 'updateTimestamp'
})