const resultService = require('../services/results.service');
const metric = require("../../shared/metric");

async function getResults(req, res){
    const start = Date.now();
    try{
        const result = await resultService.getAllItems(req.query.track || req.query.query);
        res.status(200).json(result);
    } catch(e){
        res.status(500).json({
            err:e.message
        });
        console.error(`Failed to get result message: ${e.message} \n stack trace: ${e.stack}`);
    }
    const end = Date.now()
    metric.sendMetric("web-service", "api-response-time", end-start);

}
module.exports = {
    getResults
}