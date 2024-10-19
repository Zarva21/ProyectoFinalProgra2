module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define('reserva', {
        id_reserva: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            references: {
                model: 'clientes',
                key: 'id_cliente'
            }
        },
        id_habitacion: {
            type: Sequelize.INTEGER,
            references: {
                model: 'habitacion',
                key: 'id_habitacion'
            }
        },
        fecha_entrada: {
            type: Sequelize.DATE
        },
        fecha_salida: {
            type: Sequelize.DATE,
        },
        total: {
            type: Sequelize.DOUBLE,
        },
        metodo_pago: {
            type: Sequelize.STRING(20)
        },
        situacion: {
            type: Sequelize.STRING(20)
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false // Desactiva los campos createdAt y updatedAt
    });

     // Definición de relaciones
     Reserva.associate = (models) => {
        Reserva.belongsTo(models.Cliente, {
            foreignKey: 'id_cliente',
            as: 'cliente' // Nombre del alias en las relaciones
        });
        Reserva.belongsTo(models.Habitacion, {
            foreignKey: 'id_habitacion',
            as: 'habitacion' // Nombre del alias en las relaciones
        });
    };

    return Reserva;
};