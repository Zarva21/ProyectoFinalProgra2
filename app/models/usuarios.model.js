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
        id_rol_usuario: {
            type: Sequelize.INTEGER,
            references: {
                model: 'roles_usuarios',
                key: 'id_rol_usuario'
            }
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
    return Usuario;
};