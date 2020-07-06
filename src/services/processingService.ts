import LogsService from "./logsService";
import {ChangeLog} from "../models/changeLog";
import * as fs from "fs";

class ProcessingService {
    public static queue:any[] = [];

    public static async init(monitoringDirectory:any) {
        let DBQueue:any = []

        // Get all files from DB
        const logsDB = await LogsService.get({})

        logsDB.forEach((dbLog:ChangeLog) => {
            DBQueue.push(dbLog.itemPath)
        })

        function walk(monitoringDirectory:string) {
            fs.readdirSync(monitoringDirectory).forEach((file: string) => {
                let directory = `${monitoringDirectory}/${file}`
                try {
                    walk(directory)
                }
                catch (e) {
                    if (DBQueue.indexOf(directory) < 0){
                        ProcessingService.queue.push(directory)
                        LogsService.add({itemName:directory.split('/').reverse()[0],itemPath:directory})
                        console.log(directory)
                    }
                }
            })
        }

        // Get all files from folder
        try {
            walk(monitoringDirectory)

            return ProcessingService.queue;
        } catch (e) {
            throw new Error("Directory not found.")
        }
    }

    public static async process(){
        const fileDirectory = ProcessingService.queue.pop()

        try {
            // TODO: Process the file to blockchain
        }
        catch (e) {
            // Return file to queue on fail.
            ProcessingService.queue.push(fileDirectory)
        }
    }
}

export default ProcessingService