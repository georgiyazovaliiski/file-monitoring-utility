import LogsService from "./logsService";
import {ChangeLog} from "../models/changeLog";
import * as fs from "fs";
import to from "await-to-js";
import {MailService} from "./mailService";
const parser = require("xml-parser");
const Queue = require("better-queue")

class ProcessingService {
    public static queue:any[] = new Queue(async (input:any, cb:any) => {
        try {
            await ProcessingService.process(input)
            cb(null,input)
        }catch (e) {
            cb(e,null)
        }
    }, {
        retryDelay:1000,
        id:'itemPath'
    }).on("task_failed", () => {
        console.log('Failed Task')
    }).on("task_finish", () => {
        console.log('Finished Task successfully')
    });

    public static async init(monitoringDirectory:any) {
        console.info(`Initializing unprocessed queue from [${process.env.FOLDER_PATH}]`)
        let DBQueue:any = []

        // Get all files from DB
        const logsDB = await LogsService.get({})

        logsDB.forEach((dbLog:ChangeLog) => {
            DBQueue.push(dbLog.itemPath)
        })

        function walk(monitoringDirectory:string) {
            fs.readdirSync(monitoringDirectory).forEach(async (file: string) => {
                let directory = `${monitoringDirectory}/${file}`

                if (fs.lstatSync(directory).isDirectory()) walk(directory)
                if (fs.lstatSync(directory).isFile() && DBQueue.indexOf(directory) < 0) {
                    ProcessingService.queue.push(directory)
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

    public static async sendToBlockchain(XMLParsed:any){
        // TODO: return awaited Blockchain transaction
    }

    public static async process(fileDirectory:any){
        console.info(`Processing file [${fileDirectory}]`)

        const file = fs.readFileSync(fileDirectory, 'utf8');
        const parsed = parser(file)

        console.info(`Sending data from [${fileDirectory}] to blockchain as a JSON`)

        const itemName = fileDirectory.split('/').reverse()[0]

        // TODO: Send parsed data to blockchain as a JSON
        await to(this.sendToBlockchain(parsed))

        // TODO: Figure out what data is in PARSED object
        await to(MailService.sendSuccessful())

        await to(LogsService.add({itemName:itemName, itemPath:fileDirectory}))
    }
}

export default ProcessingService