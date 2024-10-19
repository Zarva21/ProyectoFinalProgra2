module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define('factura', {
        id_factura: {
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
        id_reserva: {
            type: Sequelize.INTEGER,
            references: {
                model: 'reservas',
                key: 'id_reserva'
            }
        },
        fecha_emision: {
            type: Sequelize.DATE
        },
        pagado: {
            type: Sequelize.BOOLEAN
        },
        descripcion: {
            type: Sequelize.STRING
        },
        total: {
            type: Sequelize.DOUBLE
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Factura;
};