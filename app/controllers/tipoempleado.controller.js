const db = require('../config/db.config.js'); // Importar db
const TipoEmpleado = db.TipoEmpleado; // Acceder al modelo TipoEmpleado

// Crear un nuevo tipo de empleado
exports.createTipoEmpleado = async (req, res) => {
    try {
        const { nombre, sueldo } = req.body;

        const nuevoTipoEmpleado = await TipoEmpleado.create({
            nombre,
            sueldo
        });

        res.status(201).json({
            message: "Tipo de empleado creado exitosamente",
            tipoEmpleado: nuevoTipoEmpleado
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el tipo de empleado",
            error: error.message
        });
    }
};

// Eliminar Tipo de Empleado por ID
exports.deleteTipoEmpleadoById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await TipoEmpleado.destroy({ where: { id_tipo_empleado: id } });
        if (result === 0) {
            return res.status(404).json({ message: "Tipo de empleado no encontrado" });
        }
        res.status(200).json({ message: "Tipo de empleado eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tipo de empleado", error: error.message });
    }
};
