const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/cliente.controller.js');


// Rutas para Clientes
router.post('/clientes', clienteController.createCliente); // Crear un nuevo cliente
router.get('/clientes', clienteController.getAllClientes); // Obtener todos los clientes
router.put('/clientes/:id', clienteController.updateClienteById); // Actualizar un cliente por ID
router.delete('/clientes/:id', clienteController.deleteClienteById); // Eliminar un cliente por ID



module.exports = router;