module.exports = (sequelize, Sequelize) => {
    const RolUsuario = sequelize.define('rol_usuario', {
        id_rol_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        importancia: {
            type: Sequelize.INTEGER
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    RolUsuario.associate = (models) => {
        RolUsuario.hasMany(models.Usuario, {
            foreignKey: 'id_rol_usuario',
            as: 'usuarios'
        });
    };

    return RolUsuario;
};
