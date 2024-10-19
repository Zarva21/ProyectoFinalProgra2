const db = require('../config/db.config.js'); // Importar db
const RolUsuario = db.RolUsuario; // Acceder al modelo RolUsuario

// Crear un nuevo rol de usuario
exports.createRolUsuario = async (req, res) => {
    try {
        const { nombre, importancia, estado } = req.body;

        const nuevoRolUsuario = await RolUsuario.create({
            nombre,
            importancia,
            estado
        });

        res.status(201).json({
            message: "Rol de usuario creado exitosamente",
            rolUsuario: nuevoRolUsuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el rol de usuario",
            error: error.message
        });
    }
};

// Eliminar Rol de Usuario por ID
exports.deleteRolUsuarioById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await RolUsuario.destroy({ where: { id_rol_usuario: id } });
        if (result === 0) {
            return res.status(404).json({ message: "Rol de usuario no encontrado" });
        }
        res.status(200).json({ message: "Rol de usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar rol de usuario", error: error.message });
    }
};
