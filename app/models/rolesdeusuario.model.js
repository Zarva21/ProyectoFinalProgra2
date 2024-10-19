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
    return RolUsuario;
};
