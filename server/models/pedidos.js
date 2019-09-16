'use strict';
module.exports = (sequelize, DataTypes) => {
  const pedidos = sequelize.define('pedidos', {
    num_solicitud: DataTypes.INTEGER,
    trimestre: DataTypes.STRING,
    responsable: DataTypes.STRING,
    destino: DataTypes.STRING,
    medicamentos: DataTypes.JSON,
    id_user: DataTypes.INTEGER
  }, {});
  pedidos.associate = function(models) {
    // associations can be defined here
  };
  return pedidos;
};