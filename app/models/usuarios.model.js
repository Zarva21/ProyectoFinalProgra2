module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id_usuario: {
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
        rol_usuario: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        usuario: {
            type: Sequelize.STRING(20)
        },
        contrasena: {
            type: Sequelize.STRING(20)
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Persona, {
            foreignKey: 'id_persona',
            as: 'persona'
        });
    };
    
    return Usuario;
};