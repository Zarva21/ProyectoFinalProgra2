module.exports = (sequelize, Sequelize) => {
    const Habitacion = sequelize.define('habitacion', {
        id_habitacion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_tipo_habitacion: {
            type: Sequelize.INTEGER,
            references: {
                model: 'tipos_habitacion',
                key: 'id_tipo_habitacion'
            }
        },
        numero_cuarto: {
            type: Sequelize.INTEGER
        },
        disponible: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Habitacion;
};