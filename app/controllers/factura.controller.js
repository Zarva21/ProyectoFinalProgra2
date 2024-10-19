const db = require('../config/db.config.js');
const Factura = db.Factura; // Modelo de Factura
const Cliente = db.Clientes; // Modelo de Cliente
const Reserva = db.Reserva; // Modelo de Reserva
const Personas = db.Personas; // Modelo de Personas

// Crear una nueva factura
exports.createFactura = async (req, res) => {
    try {
        const { dpi_persona, id_reserva } = req.body;


        // Buscar a la persona por su DPI
        const persona = await Personas.findOne({ where: { dpi: dpi_persona } });
        if (!persona) {
            return res.status(404).json({ message: "Persona no encontrada" });
        }


        // Obtener el ID de cliente asociado a la persona
        const cliente = await Cliente.findOne({ where: { id_persona: persona.id_persona } });
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }


        // Buscar la reserva por ID
        const reserva = await Reserva.findByPk(id_reserva);
        if (!reserva) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }


        // Crear la factura
        const factura = await Factura.create({
            id_cliente: cliente.id_cliente,
            id_reserva: reserva.id_reserva,
            fecha_emision: new Date(),
            pagado: false, // Estado de pagado por defecto
            descripcion: "Hospedaje en hotel",
            total: reserva.total, // Asegúrate de que total esté en la reserva
            estado: true // Estado activo
        });

        res.status(201).json({
            message: "Factura creada exitosamente",
            factura: factura
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la factura",
            error: error.message
        });
    }
};

// Actualizar una factura por ID
exports.updateFacturaById = async (req, res) => {
    try {
        const id_factura = req.params.id;
        const { id_reserva, dpi_persona, fecha_emision, total } = req.body;

        // Buscar la factura existente
        const facturaExistente = await Factura.findByPk(id_factura);
        if (!facturaExistente) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }

        // Buscar a la persona por su DPI para obtener el ID de cliente
        const persona = await Personas.findOne({ where: { dpi: dpi_persona } });
        if (!persona) {
            return res.status(404).json({ message: "Persona no encontrada" });
        }

        const cliente = await Cliente.findOne({ where: { id_persona: persona.id_persona } });
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        // Buscar la reserva por ID
        const reserva = await Reserva.findByPk(id_reserva);
        if (!reserva) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        // Actualizar la factura
        facturaExistente.id_reserva = reserva.id_reserva;
        facturaExistente.id_cliente = cliente.id_cliente;
        facturaExistente.fecha_emision = fecha_emision || facturaExistente.fecha_emision; // Solo actualizar si se proporciona
        facturaExistente.total = total || facturaExistente.total; // Solo actualizar si se proporciona

        await facturaExistente.save();

        res.status(200).json({
            message: "Factura actualizada exitosamente",
            factura: facturaExistente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la factura",
            error: error.message
        });
    }
};

// Eliminar (soft delete) una factura por ID
exports.deleteFacturaById = async (req, res) => {
    try {
        const id_factura = req.params.id;

        const facturaExistente = await Factura.findByPk(id_factura);
        if (!facturaExistente) {
            return res.status(404).json({ message: "Factura no encontrada" });
        }

        // Cambiar estado a falso para simular el soft delete
        facturaExistente.estado = false;
        await facturaExistente.save();

        res.status(200).json({
            message: "Factura eliminada (soft delete) exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la factura",
            error: error.message
        });
    }
};
