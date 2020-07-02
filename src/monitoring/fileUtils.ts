import LogsService from "../services/logsService";

const listener = async (changeType:any,fullPath:any,currentStat:any,previousStat:any) => {
    switch (changeType) {
        case 'update':
            console.log(
                'the file',
                fullPath,
                'was updated',
                currentStat,
                previousStat
            )
            await LogsService.update({itemPath:fullPath,itemName:fullPath.split('[/\\]').reverse()[0]})
            break
        case 'create':
            console.log('the file', fullPath, 'was created', currentStat)
            await LogsService.add({itemPath:fullPath,itemName:fullPath.split('/').reverse()[0]})
            break
        case 'delete':
            console.log('the file', fullPath, 'was deleted', previousStat)
            await LogsService.remove({itemPath:fullPath})
            break
    }

    console.log('==============')
    console.log(await LogsService.get({}))
}

export default listener