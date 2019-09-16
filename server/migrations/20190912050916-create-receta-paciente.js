'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('receta_pacientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo_venta: {
        type: Sequelize.INTEGER
      },
      empleado: {
        type: Sequelize.STRING
      },
      historial: {
        type: Sequelize.INTEGER
      },
      tipo_consulta: {
        type: Sequelize.STRING
      },
      nombre_doctor: {
        type: Sequelize.STRING
      },
      medicamentos: {
        type: Sequelize.JSON
      },
      id_receta: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('receta_pacientes');
  }
};