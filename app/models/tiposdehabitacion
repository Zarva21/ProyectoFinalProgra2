module.exports = (sequelize, Sequelize) => {
    const TipoHabitacion = sequelize.define('tipo_habitacion', {
        id_tipo_habitacion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.DOUBLE
        }
    });
    return TipoHabitacion;
};