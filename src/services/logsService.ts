import {ChangeLog} from "../models/changeLog";


class LogsService{
    public static async add(model:any) {
        console.info(`Adding [${model.itemPath}] to SQLite`)
        return ChangeLog.create(model)
    }
    public static async remove(model:any) {
        console.info(`Removing [${model.itemPath}] to SQLite`)
        return ChangeLog.destroy({where:model})
    }
    public static async update(model:any) {
        console.info(`Updating [${model.itemPath}] to SQLite`)
        return ChangeLog.update({},{where:{itemPath: model.itemPath}})
    }
    public static async get(model:any) {
        return ChangeLog.findAll({where:model})
    }
}

export default LogsService