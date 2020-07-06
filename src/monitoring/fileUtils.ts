import LogsService from "../services/logsService";
import ProcessingService from "../services/processingService";

const updateLog = async (fullPath:any, currentStat:any, previousStat:any) => {
    console.info(
        'the file',
        fullPath,
        'was updated',
        currentStat,
        previousStat
    )
    await LogsService.update({itemPath:fullPath,itemName:fullPath.split('[/\\]').reverse()[0]})

    // TODO: SEND ALERTS, THE FILE WAS UPDATED, RUN IS INVALID NOW!
}

const createLog = async (fullPath:any, currentStat:any) => {
    // TODO: ASK WHETHER TO ADD TO QUEUE FOR PROCESSING ON RECEIVED FILE OR DIRECTLY INSERT INTO DB
    ProcessingService.queue.push(fullPath)

    const itemName = fullPath.split('/').reverse()[0]
    const itemType = itemName.split('.').reverse()[0]

    console.info('the file', fullPath, 'was created', currentStat)
    await LogsService.add({itemPath:fullPath,itemName:itemName})
}

const deleteLog = async (fullPath:any,previousStat:any) => {
    console.info('the file', fullPath, 'was deleted', previousStat)
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

    console.log('============')
    console.log(await LogsService.get({}))
}

export default listener