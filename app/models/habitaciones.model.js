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
                model: 'tipo_habitacion', // Nombre de la tabla en plural
                key: 'id_tipo_habitacion'
            }
        },
        numero_cuarto: {
            type: Sequelize.INTEGER,
            
        },
        disponible: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'habitacion',
        timestamps: false // Desactiva los campos createdAt y updatedAt
    });

    Habitacion.associate = (models) => {
        Habitacion.belongsTo(models.TipoHabitacion, {
            foreignKey: 'id_tipo_habitacion',
            as: 'tipoHabitacion' // Alias para la relación
        });
    };
    
    return Habitacion;
};
