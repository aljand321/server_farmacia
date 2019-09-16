'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      num_solicitud: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true

      },
      trimestre: {
        type: Sequelize.STRING
      },
      responsable: {
        type: Sequelize.STRING
      },
      destino: {
        type: Sequelize.STRING
      },
      medicamentos: {
        type: Sequelize.JSON
      },
      id_user: {
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pedidos');
  }
};