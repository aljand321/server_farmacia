'use strict';
module.exports = (sequelize, DataTypes) => {
  const cliente = sequelize.define('cliente', {
    ci: DataTypes.INTEGER,
    nombre: DataTypes.TEXT,
    apellidop: DataTypes.STRING,
    apellidom: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {});
  cliente.associate = function(models) {
    // associations can be defined here
    cliente.hasMany(models.receta_cliente, {
      foreignKey: 'id_cliente',
    });
  };
  return cliente;
};