'use strict';
module.exports = (sequelize, DataTypes) => {
  const receta_cliente = sequelize.define('receta_cliente', {
    codigo_venta: DataTypes.INTEGER,
    empleado: DataTypes.STRING,
    ci: DataTypes.INTEGER,
    medicamentos: DataTypes.JSON,
    id_user: DataTypes.INTEGER,
    id_cliente: DataTypes.INTEGER
  }, {});
  receta_cliente.associate = function(models) {
    // associations can be defined here
    receta_cliente.belongsTo(models.cliente, {
      foreignKey: 'id_cliente',
      onDelete: 'CASCADE'
    });
  };
  return receta_cliente;
};