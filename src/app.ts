import MonitoringService from "./services/monitoringService";
import Database from './db/database'
import to from "await-to-js";

(async () => {
    await to(Database.sync({force:true}))

    MonitoringService.start(process.cwd()+'/somefolder')
})()
