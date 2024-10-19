module.exports = (sequelize, Sequelize) => {
    const TipoEmpleado = sequelize.define('tipo_empleado', {
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
    return TipoEmpleado;
};