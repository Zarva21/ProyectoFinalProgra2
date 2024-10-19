const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clientes.controller.js');
const empleadosController = require('../controllers/empleados.controller.js');
const usuarioController = require('../controllers/usuarios.controller.js'); // Controlador de usuarios



// Rutas para Clientes
router.post('/api/clientes/create', clienteController.createCliente); // Crear un nuevo cliente
router.put('/api/clientes/up/:id', clienteController.updateClienteById); // Actualizar un cliente por ID
router.delete('/api/clientes/eli/:id', clienteController.deleteClienteById); // Eliminar un cliente por ID


// Rutas para Empleados
router.post('/api/empleados/create', empleadosController.createEmpleado);
router.put('/api/empleados/update/:id', empleadosController.updateEmpleadoById);
router.delete('/api/empleados/delete/:id', empleadosController.deleteEmpleadoById);

// Rutas para Usuarios
router.post('/api/usuarios/create', usuarioController.createUsuario); // Crear un nuevo usuario
router.put('/api/usuarios/up/:id', usuarioController.updateUsuarioById); // Actualizar un usuario por ID
router.delete('/api/usuarios/eli/:id', usuarioController.deleteUsuarioById); // Eliminar un usuario por ID




module.exports = router;