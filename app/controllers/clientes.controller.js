const db = require('../config/db.config.js');
const Persona = db.Personas;
const Cliente = db.Clientes;

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    try {
        const { nombre, apellido, fecha_nacimiento, nit, correo, genero, dpi, numero, id_tipo_cliente } = req.body;

        // Crear la persona en la tabla Personas
        const nuevaPersona = await Persona.create({
            nombre,
            apellido,
            fecha_nacimiento,
            nit,
            correo,
            genero,
            dpi,
            numero
        });

        // Crear el cliente en la tabla Clientes usando el ID de la persona creada
        const nuevoCliente = await Cliente.create({
            id_persona: nuevaPersona.id_persona, // ID de la persona recién creada
            id_tipo_cliente, // ID del tipo de cliente que se obtendrá del formulario
            fecha_creacion_cliente: new Date()
        });

        res.status(201).json({
            message: "Cliente creado exitosamente",
            cliente: nuevoCliente,
            persona: nuevaPersona
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear cliente",
            error: error.message
        });
    }
};

// Actualizar un cliente por ID
exports.updateClienteById = async (req, res) => {
    try {
        const id_cliente = req.params.id; // ID del cliente a actualizar
        const { nombre, apellido, fecha_nacimiento, nit, correo, genero, dpi, numero, id_tipo_cliente } = req.body;

        // Obtener el cliente por ID
        const clienteExistente = await Cliente.findByPk(id_cliente);
        if (!clienteExistente) {
            return res.status(404).json({ message: `Cliente con id ${id_cliente} no encontrado` });
        }

        // Obtener el id_persona del cliente existente
        const id_persona = clienteExistente.id_persona;

        // Obtener la persona relacionada
        const persona = await Persona.findByPk(id_persona);
        if (!persona) {
            return res.status(404).json({ message: `Persona con id ${id_persona} no encontrada` });
        }

        // Actualizar la información de la persona
        persona.nombre = nombre;
        persona.apellido = apellido;
        persona.fecha_nacimiento = fecha_nacimiento;
        persona.nit = nit;
        persona.correo = correo;
        persona.genero = genero;
        persona.dpi = dpi;
        persona.numero = numero;

        await persona.save(); // Guardar los cambios en la tabla Personas

        // Actualizar el cliente
        clienteExistente.id_tipo_cliente = id_tipo_cliente; // Asegúrate de que id_tipo_cliente está en el body
        await clienteExistente.save(); // Guardar los cambios en la tabla Clientes

        res.status(200).json({
            message: "Cliente actualizado exitosamente",
            cliente: clienteExistente,
            persona
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar cliente",
            error: error.message
        });
    }
};



// Eliminar (cambiar estado) un cliente por ID
exports.deleteClienteById = async (req, res) => {
    try {
        const id_cliente = req.params.id;
        const clienteExistente = await Cliente.findByPk(id_cliente);
        if (!clienteExistente) {
            return res.status(404).json({ message: `Cliente con id ${id_cliente} no encontrado` });
        }

        // Obtener la persona relacionada y cambiar su estado a inactivo
        const persona = await Persona.findByPk(clienteExistente.id_persona);
        persona.estado = false; // Cambiar estado a inactivo
        await persona.save();

        // Eliminar el cliente
        await clienteExistente.destroy();

        res.status(200).json({
            message: "Cliente eliminado (estado inactivo) exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar cliente",
            error: error.message
        });
    }
};
