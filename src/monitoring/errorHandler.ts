const next = (err: Error) => {
    if(err) return console.error(`Failed watching files in directory [${process.env.FOLDER_PATH}] - error: ${err.message}`)
    console.log(`Currently monitoring files in directory [${process.cwd()}${process.env.FOLDER_PATH}]`)
}

export default next