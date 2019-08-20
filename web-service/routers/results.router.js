const resultController = require('../controllers/results.controller');

function defineRoutes(app){
    app.get('/results',resultController.getResults)
}

module.exports = {
    defineRoutes
}
