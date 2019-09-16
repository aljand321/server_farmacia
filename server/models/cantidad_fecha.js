'use strict';
module.exports = (sequelize, DataTypes) => {
  const cantidad_fecha = sequelize.define('cantidad_fecha', {
    codigo_compra: DataTypes.INTEGER,
    fehca_vencimineto: DataTypes.STRING,
    cantidad_unidad: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL,
    id_medicamento: DataTypes.INTEGER
  }, {});
  cantidad_fecha.associate = function(models) {
    // associations can be defined here
    cantidad_fecha.belongsTo(models.medicamentos, {
      foreignKey: 'id_medicamento',
      onDelete: 'CASCADE'
    });
  };
  return cantidad_fecha;
};