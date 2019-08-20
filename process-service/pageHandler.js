const request = require("request-promise-native");

module.exports = {
    getPageByUrl: async function getPageByUrl(url){
        return await request.get(url);
    }
}