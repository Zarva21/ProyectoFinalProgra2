module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleado', {
        id_empleado: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_persona: {
            type: Sequelize.INTEGER,
            references: {
                model: 'personas',
                key: 'id_persona'
            }
        },
        id_tipo_empleado: {
            type: Sequelize.INTEGER,
            references: {
                model: 'tipos_empleado',
                key: 'id_tipo_empleado'
            }
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Empleado;
};