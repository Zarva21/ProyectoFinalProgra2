module.exports = (sequelize, Sequelize) => {
    const TipoEmpleado = sequelize.define('tipos_empleado', {
        id_tipo_empleado: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        sueldo: {
            type: Sequelize.DOUBLE
        }
    });

    // Definir las asociaciones
    TipoEmpleado.associate = (models) => {
        // Asociación uno a muchos con Empleado
        TipoEmpleado.hasMany(models.empleado, { foreignKey: 'id_tipo_empleado' });
    };

    return TipoEmpleado;
};
