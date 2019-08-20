const Sequelize = require('sequelize');
const item = require("./item.model")
const sequelize = new Sequelize(process.env.db_connection);

const itemModel = item.defineModel(Sequelize,sequelize);
sequelize.sync({force:false})



module.exports = {
    item:itemModel
}