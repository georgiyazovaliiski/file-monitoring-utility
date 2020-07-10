import LogsService from "../services/logsService";
import ProcessingService from "../services/processingService";
import {MailService} from "../services/mailService";

const updateLog = async (fullPath:any, currentStat:any, previousStat:any) => {
    console.info(`The file [${fullPath}] was updated:`)
    await LogsService.update({itemPath:fullPath,itemName:fullPath.split('[/\\]').reverse()[0]})

    // TODO: SEND ALERTS, THE FILE WAS UPDATED, RUN IS INVALID NOW!

    // TODO: Figure out what data is in PARSED object
    await MailService.sendAlert('update')

    // TODO: RECORD ALERT TO BLOCKCHAIN

    // TODO: SETUP EMAIL SERVICE - SEND GRID JS
}

const createLog = async (fullPath:any, currentStat:any) => {
    ProcessingService.queue.push(fullPath)

    const itemName = fullPath.split('/').reverse()[0]

    console.info(`The file [${fullPath}] was created`)
}

const deleteLog = async (fullPath:any,previousStat:any) => {
    console.info(`The file [${fullPath}] was deleted`)

    // TODO: SEND ALERTS, THE FILE WAS UPDATED, RUN IS INVALID NOW!

    // TODO: Figure out what data is in PARSED object
    await MailService.sendAlert('delete')
    // TODO: RECORD ALERT TO BLOCKCHAIN

    // TODO: SETUP EMAIL SERVICE - SEND GRID JS

    await LogsService.remove({itemPath:fullPath})
}

const listener = async (changeType:any,fullPath:any,currentStat:any,previousStat:any) => {
    switch (changeType) {
        case 'update':
            await updateLog(fullPath,currentStat,previousStat)
            break
        case 'create':
            await createLog(fullPath,currentStat)
            break
        case 'delete':
            await deleteLog(fullPath,previousStat)
            break
    }
}

export default listener