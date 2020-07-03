import LogsService from "../services/logsService";

const listener = async (changeType:any,fullPath:any,currentStat:any,previousStat:any) => {
    switch (changeType) {
        case 'update':
            console.info(
                'the file',
                fullPath,
                'was updated',
                currentStat,
                previousStat
            )
            await LogsService.update({itemPath:fullPath,itemName:fullPath.split('[/\\]').reverse()[0]})
            break
        case 'create':
            const itemName = fullPath.split('/').reverse()[0]
            const itemType = itemName.split('.').reverse()[0]

            if(itemType == 'xml'){
                // TODO: Parse xml and record post to blockchain?
            }
            if(itemType == 'pdf'){
                // TODO: Process pdf
            }

            console.info('the file', fullPath, 'was created', currentStat)
            await LogsService.add({itemPath:fullPath,itemName:itemName})
            break
        case 'delete':
            console.info('the file', fullPath, 'was deleted', previousStat)
            await LogsService.remove({itemPath:fullPath})
            break
    }

    console.log('============')
    console.log(await LogsService.get({}))
}

export default listener