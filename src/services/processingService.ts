import LogsService from "./logsService";
import {ChangeLog} from "../models/changeLog";
import * as fs from "fs";
const parser = require("xml-parser");

class ProcessingService {
    public static queue:any[] = [];

    public static async init(monitoringDirectory:any) {
        console.info(`Initializing unprocessed queue from [${process.env.FOLDER_PATH}]`)
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
                        // ProcessingService.process()
                    }
                }
            })
        }

        try {
            walk(monitoringDirectory)
            return ProcessingService.queue;
        } catch (e) {
            throw new Error(`Directory [${monitoringDirectory}] not found.`)
        }
    }

    public static async process(){
        const fileDirectory = ProcessingService.queue.pop()

        console.info(`Processing file [${fileDirectory}]`)

        try {
            const file = fs.readFileSync(fileDirectory, 'utf8');
            const parsed = parser(file)

            console.info(`Sending data from [${fileDirectory}] to blockchain as a JSON`)
            // TODO: Send parsed data to blockchain as a JSON
        }
        catch (e) {
            console.error(`Could not process file [${fileDirectory}] - error: ${e.message}`)
            console.info(`Enqueuing [${fileDirectory}] back in the process queue`)
            ProcessingService.queue.push(fileDirectory)
        }
    }
}

export default ProcessingService