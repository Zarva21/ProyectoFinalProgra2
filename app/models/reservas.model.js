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
                model: 'habitaciones',
                key: 'id_habitacion'
            }
        },
        fecha_entrada: {
            type: Sequelize.DATE
        },
        fecha_salida: {
            type: Sequelize.DATE
        },
        situacion: {
            type: Sequelize.STRING(20)
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Reserva;
};