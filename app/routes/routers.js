const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clientes.controller.js');
const empleadosController = require('../controllers/empleados.controller.js');



// Rutas para Clientes
router.post('/api/clientes/create', clienteController.createCliente); // Crear un nuevo cliente
router.put('/api/clientes/up/:id', clienteController.updateClienteById); // Actualizar un cliente por ID
router.delete('/api/clientes/eli/:id', clienteController.deleteClienteById); // Eliminar un cliente por ID


// Rutas para Empleados
router.post('/api/empleados/create', empleadosController.createEmpleado);
router.put('/api/empleados/update/:id', empleadosController.updateEmpleadoById);
router.delete('/api/empleados/delete/:id', empleadosController.deleteEmpleadoById);


module.exports = router;