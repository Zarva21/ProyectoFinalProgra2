// personas.model.js
module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define('persona', {
        id_persona: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING(20)
        },
        apellido: {
            type: Sequelize.STRING(20)
        },
        fecha_nacimiento: {
            type: Sequelize.DATE
        },
        nit: {
            type: Sequelize.STRING(20)
        },
        correo: {
            type: Sequelize.STRING(40)
        },
        genero: {
            type: Sequelize.STRING(1)
        },
        dpi: {
            type: Sequelize.BIGINT
        },
        numero: {
            type: Sequelize.INTEGER
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    Persona.associate = (models) => {
        Persona.hasMany(models.cliente, { foreignKey: 'id_persona', as: 'clientes' });
        Persona.hasMany(models.empleado, { foreignKey: 'id_persona', as: 'empleados' });
    };
    

    return Persona;
};
