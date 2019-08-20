const resultService = require('../services/results.service');

async function getResults(req, res){
    try{
        const result = await resultService.getAllItems(req.query.track);
        res.status(200).json(result);
    } catch(e){
        res.status(500).json({
            err:e.message
        });
        console.error(`Failed to get result message: ${e.message} \n stack trace: ${e.stack}`);
    }
}
module.exports = {
    getResults
}