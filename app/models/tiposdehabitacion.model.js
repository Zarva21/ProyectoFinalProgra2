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
    }, {
        tableName: 'tipo_habitacion', // Especifica el nombre de la tabla aquí
        timestamps: false // Desactiva los campos createdAt y updatedAt
    });

    TipoHabitacion.associate = (models) => {
        TipoHabitacion.hasMany(models.Habitacion, {
            foreignKey: 'id_tipo_habitacion',
            as: 'habitaciones'
        });
    };

    return TipoHabitacion;
};
