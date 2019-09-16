'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('receta_clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo_venta: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        autoIncrement: true,
      },
      empleado: {
        type: Sequelize.STRING
      },
      ci: {
        type: Sequelize.INTEGER
      },
      medicamentos: {
        type: Sequelize.JSON
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'clientes',
          key: 'id',
          as: 'id_cliente',
        }
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
    return queryInterface.dropTable('receta_clientes');
  }
};