import {ChangeLog} from "../models/changeLog";


class LogsService{
    public static async add(model:any) {
        return ChangeLog.create(model)
    }
    public static async remove(model:any) {
        return ChangeLog.destroy({where:model})
    }
    public static async update(model:any) {
        return ChangeLog.update({},{where:{itemPath: model.itemPath}})
    }
    public static async get(model:any) {
        return ChangeLog.findAll({where:model})
    }
}

export default LogsService