function validate(){
    if(!process.env.track){
        throw new Error('Service must have track in env varibles')
    }
}


module.exports = {
    validate
}