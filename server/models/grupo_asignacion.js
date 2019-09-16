'use strict';
module.exports = (sequelize, DataTypes) => {
  const grupo_asignacion = sequelize.define('grupo_asignacion', {
    codigo: DataTypes.INTEGER,
    descripcion: DataTypes.STRING
  }, {});
  grupo_asignacion.associate = function(models) {
    // associations can be defined here
    grupo_asignacion.hasMany(models.medicamentos, {
      foreignKey: 'id_grupoAsig',
    });
  };
  return grupo_asignacion;
};