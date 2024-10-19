const db = require('../config/db.config.js');
const Persona = db.Personas;
const Empleado = db.Empleados;
const TipoEmpleado = db.TipoEmpleado; // Asegúrate de importar el modelo de TipoEmpleado

// Crear un nuevo empleado
exports.createEmpleado = async (req, res) => {
    try {
        const { nombre, apellido, fecha_nacimiento, nit, correo, genero, dpi, numero, id_tipo_empleado } = req.body;

        // Crear la persona en la tabla Personas
        const nuevaPersona = await Persona.create({
            nombre,
            apellido,
            fecha_nacimiento,
            nit,
            correo,
            genero,
            dpi,
            numero,
            estado: true // Estado activo por defecto
        });

        // Crear el empleado en la tabla Empleados usando el ID de la persona creada
        const nuevoEmpleado = await Empleado.create({
            id_persona: nuevaPersona.id_persona, // ID de la persona recién creada
            id_tipo_empleado, // ID del tipo de empleado
            estado: true // Estado activo por defecto
        });

        res.status(201).json({
            message: "Empleado creado exitosamente",
            empleado: nuevoEmpleado,
            persona: nuevaPersona
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear empleado",
            error: error.message
        });
    }
};

// Actualizar un empleado por ID
exports.updateEmpleadoById = async (req, res) => {
    try {
        const id_empleado = req.params.id; // ID del empleado a actualizar
        const { nombre, apellido, fecha_nacimiento, nit, correo, genero, dpi, numero, id_tipo_empleado } = req.body;

        // Obtener el empleado por ID
        const empleadoExistente = await Empleado.findByPk(id_empleado);
        if (!empleadoExistente) {
            return res.status(404).json({ message: `Empleado con id ${id_empleado} no encontrado` });
        }

        // Obtener el id_persona del empleado existente
        const id_persona = empleadoExistente.id_persona;

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

        // Actualizar el empleado
        empleadoExistente.id_tipo_empleado = id_tipo_empleado; // Actualiza el tipo de empleado
        await empleadoExistente.save(); // Guardar los cambios en la tabla Empleados

        res.status(200).json({
            message: "Empleado actualizado exitosamente",
            empleado: empleadoExistente,
            persona
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar empleado",
            error: error.message
        });
    }
};

// Eliminar (cambiar estado) un empleado por ID
exports.deleteEmpleadoById = async (req, res) => {
    try {
        const id_empleado = req.params.id;
        const empleadoExistente = await Empleado.findByPk(id_empleado);
        if (!empleadoExistente) {
            return res.status(404).json({ message: `Empleado con id ${id_empleado} no encontrado` });
        }

        // Obtener la persona relacionada y cambiar su estado a inactivo
        const persona = await Persona.findByPk(empleadoExistente.id_persona);
        persona.estado = false; // Cambiar estado a inactivo
        await persona.save();

        // Eliminar el empleado
        await empleadoExistente.destroy();

        res.status(200).json({
            message: "Empleado eliminado (estado inactivo) exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar empleado",
            error: error.message
        });
    }
};
