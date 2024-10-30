module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {
        id_cliente: {
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
        id_tipo_cliente: {
            type: Sequelize.INTEGER // Este campo debe existir en tu formulario
        },
        fecha_creacion_cliente: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    Cliente.associate = (models) => {
        // Define la asociación muchos a uno
        Cliente.belongsTo(models.persona, { foreignKey: 'id_persona' });

    };

    


    return Cliente;
};
