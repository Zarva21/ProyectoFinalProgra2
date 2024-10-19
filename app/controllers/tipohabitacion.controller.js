const db = require('../config/db.config.js'); // Importar db
const TipoHabitacion = db.TipoHabitacion; // Acceder al modelo TipoHabitacion

// Crear un nuevo tipo de habitación
exports.createTipoHabitacion = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;

        const nuevoTipoHabitacion = await TipoHabitacion.create({
            nombre,
            descripcion,
            precio
        });

        res.status(201).json({
            message: "Tipo de habitación creado exitosamente",
            tipoHabitacion: nuevoTipoHabitacion
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el tipo de habitación",
            error: error.message
        });
    }
};

// Eliminar Tipo de Habitación por ID
exports.deleteTipoHabitacionById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await TipoHabitacion.destroy({ where: { id_tipo_habitacion: id } });
        if (result === 0) {
            return res.status(404).json({ message: "Tipo de habitación no encontrado" });
        }
        res.status(200).json({ message: "Tipo de habitación eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tipo de habitación", error: error.message });
    }
};
