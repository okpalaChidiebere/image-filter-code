'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Image-filter', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        url: {
          type: Sequelize.STRING
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Image-filter');
    }
  };