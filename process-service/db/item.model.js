function defineModel(Sequelize, sequelize) {
  class Item extends Sequelize.Model {}
  Item.init(
    {
      title: Sequelize.STRING,
      description: Sequelize.STRING,
      link: Sequelize.STRING,
      content: Sequelize.STRING,
      timestamp: Sequelize.INTEGER,
      imageurl: Sequelize.STRING,
      track: Sequelize.STRING
    },
    { sequelize, modelName: "items" }
  );

  return Item;
}

module.exports = {
  defineModel
}
