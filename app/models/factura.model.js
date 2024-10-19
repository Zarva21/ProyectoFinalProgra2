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
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        descripcion: {
            type: Sequelize.STRING,
            defaultValue: "Hospedaje en hotel" 
        },
        total: {
            type: Sequelize.DOUBLE
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    
    Factura.associate = (models) => {
        // Define las relaciones
        Factura.belongsTo(models.Clientes, {
            foreignKey: 'id_cliente',
            as: 'cliente'
        });
        Factura.belongsTo(models.Reserva, {
            foreignKey: 'id_reserva',
            as: 'reserva'
        });
    };
    return Factura;
};