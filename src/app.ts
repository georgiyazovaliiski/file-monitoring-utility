require('dotenv').config()
import MonitoringService from "./services/monitoringService";
import Database from './db/database'
import to from "await-to-js";
import ProcessingService from "./services/processingService";
const monitoringDirectory = process.cwd()+process.env.FOLDER_PATH;


// TODO: MIDDLEWARE CHECK FOR LOGGED USER

(async () => {
    await to(Database.sync())

    await ProcessingService.init(monitoringDirectory)

    MonitoringService.start(monitoringDirectory)
})()
