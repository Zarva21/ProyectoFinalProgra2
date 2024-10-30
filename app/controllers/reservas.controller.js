// controllers/ReservaController.js
const db = require('../config/db.config.js');
const Reserva = db.Reserva; // Modelo de Reserva
const Cliente = db.Clientes; // Modelo de Cliente
const Habitacion = db.Habitacion; // Modelo de Habitacion
const TipoHabitacion = db.TipoHabitacion; // Modelo de TipoHabitacion
const Personas = db.Personas; // Modelo de Personas

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
    try {
        const { dpi_persona, id_habitacion, fecha_entrada, fecha_salida, metodo_pago } = req.body;

        console.log(dpi_persona)
         // Verificar que la habitación existe y obtener el tipo de habitación y su precio
         const habitacionExistente = await Habitacion.findOne({
            where: { id_habitacion, disponible: true },
            include: {
                model: TipoHabitacion,
                as: 'tipoHabitacion'
            }
        });
        if (!habitacionExistente) {
            console.log('Habitación no encontrada:', id_habitacion);
            return res.status(404).json({ message: 'La habitación no existe' });
        }
    
         // Buscar a la persona por su DPI
         const persona = await Personas.findOne({ where: { dpi: dpi_persona } });
         if (!persona) {
             return res.status(404).json({ message: "Persona no encontrada" });
         }
         console.log(persona)

 
         // Obtener el ID de cliente asociado a la persona
         const cliente = await Cliente.findOne({ where: { id_persona: persona.id_persona } });
         if (!cliente) {
             return res.status(404).json({ message: "Cliente no encontrado" });
         }



        const total = habitacionExistente.tipoHabitacion.precio;


        // Crear nueva reserva
        const nuevaReserva = await Reserva.create({
            id_cliente: cliente.id_cliente,
            id_habitacion,
            fecha_entrada,
            fecha_salida,
            total,
            metodo_pago,
            situacion: "disponible", // Asignar estado automático
            estado: true // Estado predeterminado
        });

          // Actualizar el estado de la habitación a no disponible
          habitacionExistente.disponible = false;
          await habitacionExistente.save();    



          // Mostrar en la consola la reserva que se está creando
          console.log('Reserva creada:', nuevaReserva);

        res.status(201).json({
            message: "Reserva creada exitosamente",
            reserva: nuevaReserva
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la reserva",
            error: error.message
        });
    }
};

// Actualizar una reserva por ID
exports.updateReservaById = async (req, res) => {
    try {
        const id_reserva = req.params.id;
        const { dpi_persona, id_habitacion, fecha_entrada, fecha_salida, metodo_pago, situacion } = req.body;



        // Buscar a la persona por su DPI
        const persona = await db.Personas.findOne({ where: { dpi: dpi_persona } });
        if (!persona) {
            return res.status(404).json({ message: "Persona no encontrada" });
        }

        // Obtener el ID de cliente asociado a la persona
        const cliente = await Cliente.findOne({ where: { id_persona: persona.id_persona } });
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }


        // Buscar la reserva existente por ID
        const reservaExistente = await Reserva.findByPk(id_reserva);
        if (!reservaExistente) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        // Si se proporciona un nuevo ID de habitación, verificar que la nueva habitación existe y está disponible
        if (id_habitacion && id_habitacion !== reservaExistente.id_habitacion) {
            const nuevaHabitacion = await Habitacion.findOne({
                where: {
                    id_habitacion,
                    disponible: true // Asegurarse de que la habitación esté disponible
                }
            });

            if (!nuevaHabitacion) {
                return res.status(400).json({ message: "La nueva habitación seleccionada no está disponible" });
            }

            // Actualizar la disponibilidad de la antigua habitación a disponible
            const antiguaHabitacion = await Habitacion.findByPk(reservaExistente.id_habitacion);
            antiguaHabitacion.disponible = true;
            await antiguaHabitacion.save();

            // Actualizar el ID de habitación en la reserva
            reservaExistente.id_habitacion = id_habitacion;

            // Cambiar la nueva habitación a no disponible
            nuevaHabitacion.disponible = false;
            await nuevaHabitacion.save();
        }

        // Actualizar fechas y otros campos de la reserva
        reservaExistente.fecha_entrada = fecha_entrada;
        reservaExistente.fecha_salida = fecha_salida;
        reservaExistente.metodo_pago = metodo_pago;
        reservaExistente.situacion = situacion;

        // Obtener el precio de la nueva habitación (o de la habitación actual si no cambió)
        const habitacionActual = await Habitacion.findByPk(reservaExistente.id_habitacion);
        const tipoHabitacion = await TipoHabitacion.findByPk(habitacionActual.id_tipo_habitacion);
        const total = tipoHabitacion.precio; // Calcular el nuevo total

        // Actualizar el total en la reserva
        reservaExistente.total = total;

        // Guardar los cambios
        await reservaExistente.save();

        res.status(200).json({
            message: "Reserva actualizada exitosamente",
            reserva: reservaExistente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la reserva",
            error: error.message
        });
    }
};


// Eliminar una reserva por ID (cambiar estado a inactivo)
exports.deleteReservaById = async (req, res) => {
    try {
        const id_reserva = req.params.id;

        const reservaExistente = await Reserva.findByPk(id_reserva);
        if (!reservaExistente) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        // Cambiar estado a inactivo
        reservaExistente.estado = false;
        await reservaExistente.save();

        res.status(200).json({
            message: "Reserva eliminada exitosamente",
            reserva: reservaExistente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la reserva",
            error: error.message
        });
    }
};
