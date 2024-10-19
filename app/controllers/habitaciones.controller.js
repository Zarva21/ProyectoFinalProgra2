const db = require('../config/db.config.js');
const Habitacion = db.Habitacion;
const TipoHabitacion = db.TipoHabitacion;

// Crear una nueva habitación
exports.createHabitacion = async (req, res) => {
    try {
        const { id_tipo_habitacion, numero_cuarto } = req.body;


        const nuevaHabitacion = await Habitacion.create({
            id_tipo_habitacion,
            numero_cuarto,
            disponible: true,
            estado: true
        });

        



        res.status(201).json({
            message: "Habitación creada exitosamente",
            habitacion: nuevaHabitacion
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear habitación",
            error: error.message
        });
    }
};

// Actualizar una habitación por ID
exports.updateHabitacionById = async (req, res) => {
    try {
        const id_habitacion = req.params.id;
        const { id_tipo_habitacion, numero_cuarto, disponible, estado } = req.body;

        

        // Buscar la habitación existente en la base de datos
        const habitacionExistente = await Habitacion.findByPk(id_habitacion);

        // Verificar si la habitación existe
        if (!habitacionExistente) {
            return res.status(404).json({
                message: "Habitación no encontrada"
            });
        }

        // Actualizar los campos de la habitación
        habitacionExistente.id_tipo_habitacion = id_tipo_habitacion;
        habitacionExistente.numero_cuarto = numero_cuarto;
        habitacionExistente.disponible = disponible;
        habitacionExistente.estado = estado;

        // Guardar los cambios en la base de datos
        await habitacionExistente.save();

        res.status(200).json({
            message: "Habitación actualizada exitosamente",
            habitacion: habitacionExistente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar habitación",
            error: error.message
        });
    }
};

// Eliminar (cambiar estado a inactivo) una habitación por ID
exports.deleteHabitacionById = async (req, res) => {
    try {
        const id_habitacion = req.params.id;

        // Verificar que la habitación existe
        const habitacionExistente = await Habitacion.findByPk(id_habitacion);
        if (!habitacionExistente) {
            return res.status(404).json({ message: `Habitación con id ${id_habitacion} no encontrada` });
        }

        // Cambiar el estado a inactivo
        habitacionExistente.estado = false; // o disponible = false, según tu lógica
        await habitacionExistente.save();

        res.status(200).json({
            message: "Habitación eliminada exitosamente",
            habitacion: habitacionExistente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar habitación",
            error: error.message
        });
    }
};
