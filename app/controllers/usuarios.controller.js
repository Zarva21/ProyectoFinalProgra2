// controllers/UsuarioController.js
const db = require('../config/db.config.js');
const Usuario = db.Usuario;
const RolUsuario = db.RolUsuario;

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    try {
        const { rol_usuario, id_persona, usuario, contrasena } = req.body;

        const nuevoUsuario = await Usuario.create({
            rol_usuario,
            id_persona,
            usuario,
            contrasena,
            estado: true // Estado activo por defecto
        });

        res.status(201).json({
            message: "Usuario creado exitosamente",
            usuario: nuevoUsuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear usuario",
            error: error.message
        });
    }
};

// Actualizar un usuario por ID
exports.updateUsuarioById = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        const { rol_usuario, id_persona, usuario, contrasena } = req.body;

        const usuarioExistente = await Usuario.findByPk(id_usuario);
        if (!usuarioExistente) {
            return res.status(404).json({ message: `Usuario con id ${id_usuario} no encontrado` });
        }

        usuarioExistente.rol_usuario = rol_usuario;
        usuarioExistente.id_persona = id_persona;
        usuarioExistente.usuario = usuario;
        usuarioExistente.contrasena = contrasena;

        await usuarioExistente.save();

        res.status(200).json({
            message: "Usuario actualizado exitosamente",
            usuario: usuarioExistente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar usuario",
            error: error.message
        });
    }
};

// Eliminar (cambiar estado) un usuario por ID
exports.deleteUsuarioById = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        const usuarioExistente = await Usuario.findByPk(id_usuario);
        if (!usuarioExistente) {
            return res.status(404).json({ message: `Usuario con id ${id_usuario} no encontrado` });
        }

        usuarioExistente.estado = false; // Cambiar estado a inactivo
        await usuarioExistente.save();

        res.status(200).json({
            message: "Usuario eliminado (estado inactivo) exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar usuario",
            error: error.message
        });
    }
};

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ include: [{ model: RolUsuario, as: 'rol' }] });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuarios",
            error: error.message
        });
    }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        const usuario = await Usuario.findByPk(id_usuario, { include: [{ model: RolUsuario, as: 'rol' }] });
        if (!usuario) {
            return res.status(404).json({ message: `Usuario con id ${id_usuario} no encontrado` });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener usuario",
            error: error.message
        });
    }
};
