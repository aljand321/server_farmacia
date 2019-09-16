'use strict';
module.exports = (sequelize, DataTypes) => {
  const receta_paciente = sequelize.define('receta_paciente', {
    codigo_venta: DataTypes.INTEGER,
    empleado: DataTypes.STRING,
    historial: DataTypes.INTEGER,
    tipo_consulta: DataTypes.STRING,
    nombre_doctor: DataTypes.STRING,
    medicamentos: DataTypes.JSON,
    id_receta: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
  }, {});
  receta_paciente.associate = function(models) {
    // associations can be defined here
  };
  return receta_paciente;
};