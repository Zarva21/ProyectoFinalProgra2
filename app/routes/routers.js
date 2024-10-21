const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clientes.controller.js');
const empleadosController = require('../controllers/empleados.controller.js');
const usuarioController = require('../controllers/usuarios.controller.js'); // Controlador de usuarios
const HabitacionController = require('../controllers/habitaciones.controller.js');
const ReservaController = require('../controllers/reservas.controller.js');
const facturaController = require('../controllers/factura.controller.js');

const tipoHabitacionController = require('../controllers/tipohabitacion.controller.js');
const tipoEmpleadoController = require('../controllers/tipoempleado.controller.js');
const rolUsuarioController = require('../controllers/rolusuario.controller.js');

const searchController = require('../controllers/search.controller.js');


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

// Rutas para Habitaciones
router.post('/habitaciones/create', HabitacionController.createHabitacion);
router.put('/habitaciones/update/:id', HabitacionController.updateHabitacionById);
router.delete('/habitaciones/delete/:id', HabitacionController.deleteHabitacionById);

// Rutas para Reserva
router.post('/api/reservas/create', ReservaController.createReserva);
router.put('/api/reservas/update/:id', ReservaController.updateReservaById);
router.delete('/api/reservas/delete/:id', ReservaController.deleteReservaById);

// Rutas para Facturas
router.post('/api/facturas/create', facturaController.createFactura);
router.put('/api/facturas/update/:id', facturaController.updateFacturaById);
router.delete('/api/facturas/delete/:id', facturaController.deleteFacturaById);

// Rutas para Tipo de Habitación
router.post('/tipohabitacion', tipoHabitacionController.createTipoHabitacion); // Crear tipo de habitación
router.delete('/tipohabitacion/:id', tipoHabitacionController.deleteTipoHabitacionById); // Eliminar tipo de habitación por ID

// Rutas para Tipo de Empleado
router.post('/tipoempleado', tipoEmpleadoController.createTipoEmpleado); // Crear tipo de empleado
router.delete('/tipoempleado/:id', tipoEmpleadoController.deleteTipoEmpleadoById); // Eliminar tipo de empleado por ID

// Rutas para Rol de Usuario
router.post('/rolusuario', rolUsuarioController.createRolUsuario); // Crear rol de usuario
router.delete('/rolusuario/:id', rolUsuarioController.deleteRolUsuarioById); // Eliminar rol de usuario por ID

// Ruta de busqueda
router.get('/search', searchController.generalSearch);


module.exports = router;