const next = (err: Error) => {
    if(err) return console.error('watch failed: ', err.message)
    console.log('watch successful!')
}

export default next