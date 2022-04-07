module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("Tutorial", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      mongoRefId: {
        type: Sequelize.STRING
      },
    },{timestamps: false});
    return Tutorial;
  };