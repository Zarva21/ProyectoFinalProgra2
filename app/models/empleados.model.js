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
                model: 'personas', // Debe coincidir con el nombre de la tabla
                key: 'id_persona'
            }
        },
        id_tipo_empleado: {
            type: Sequelize.INTEGER,
            references: {
                model: 'tipos_empleados', // Debe coincidir con el nombre de la tabla
                key: 'id_tipo_empleado'
            }
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    // Definir las asociaciones
    Empleado.associate = (models) => {
        // Asociación muchos a uno con Persona
        Empleado.belongsTo(models.persona, { foreignKey: 'id_persona' });
        
        // Asociación muchos a uno con TipoEmpleado
        Empleado.belongsTo(models.tipo_empleado, { foreignKey: 'id_tipo_empleado' });
    };

    return Empleado;
};
