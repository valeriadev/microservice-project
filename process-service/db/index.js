const Sequelize = require('sequelize');
const item = require("./item.model")
const sequelize = new Sequelize('mysql://admin:7QY]q[>989VV~FU=@main-db.cc4vgf6fgow7.eu-west-1.rds.amazonaws.com:3306/main');

const itemModel = item.defineModel(Sequelize,sequelize);
sequelize.sync({force:false})



module.exports = {
    item:itemModel
}