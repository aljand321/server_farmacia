'use strict';
module.exports = (sequelize, DataTypes) => {
  const medicamentos = sequelize.define('medicamentos', {
    codificacion: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    generico: DataTypes.STRING,
    unida_medida: DataTypes.STRING,
    forma_f: DataTypes.STRING,
    presentacion: DataTypes.STRING,
    cantidad_inicial:DataTypes.INTEGER,
    entradas:DataTypes.INTEGER,
    cantidad_unidad: DataTypes.INTEGER,
    precio_compra: DataTypes.DECIMAL,
    precio:DataTypes.DECIMAL,
    ventas: DataTypes.INTEGER,
    id_grupoAsig: DataTypes.INTEGER
  }, {});
  medicamentos.associate = function(models) {
    // associations can be defined here
    medicamentos.hasMany(models.cantidad_fecha, {
      foreignKey: 'id_medicamento',
    });
    medicamentos.belongsTo(models.grupo_asignacion, {
      foreignKey: 'id_grupoAsig',
      onDelete: 'CASCADE'
    });
  };
  return medicamentos;
};