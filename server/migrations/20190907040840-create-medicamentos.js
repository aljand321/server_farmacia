'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('medicamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estado:{
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
      },
      codificacion: {
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      generico: {
        type: Sequelize.STRING
      },
      unida_medida: {
        type: Sequelize.STRING
      },
      forma_f: {
        type: Sequelize.STRING
      },
      presentacion: {
        type: Sequelize.STRING
      },
      receta_medico:{
        type: Sequelize.STRING
      },
      cantidad_inicial:{
        type: Sequelize.INTEGER
      },
      entradas:{
        type: Sequelize.INTEGER        
      },
      cantidad_unidad: {
        type: Sequelize.INTEGER
      },
      precio_compra:{
        type: Sequelize.DECIMAL
      },
      precio:{
        type: Sequelize.DECIMAL
      },
      ventas: {
        type: Sequelize.INTEGER
      },
      id_grupoAsig: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'grupo_asignacions',
          key: 'id',
          as: 'id_grupoAsig',
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
    return queryInterface.dropTable('medicamentos');
  }
};