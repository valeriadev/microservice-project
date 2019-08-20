const db = require("../../process-service/db");

async function getAllItems(userTrack){
    if(userTrack === undefined){
        return await db.item.findAll({attributes:['link','title', 'description','content', 'imageurl','timestamp']})

            }        else{
    return await db.item.findAll({
        where: {
          track: userTrack
        }
      })
    }
}

module.exports = {
    getAllItems
}