const db = require('../config/db.config.js'); // Importar db

// Modelos
const RolUsuario = db.RolUsuario;
const TipoEmpleado = db.TipoEmpleado;
const Usuario = db.Usuario;
const TipoHabitacion = db.TipoHabitacion;
const Habitacion = db.Habitacion;
const Reserva = db.Reserva;
const Factura = db.Factura;
const Persona = db.Personas;
const Cliente = db.Clientes;
const Empleado = db.Empleados;


exports.generalSearch = async (req, res) => {
    try {
        const { tableName, columnName, searchValue } = req.query;

        if (!tableName || !columnName) {
            return res.status(400).json({ message: "Debe especificar el nombre de la tabla y la columna" });
        }

        const model = db[tableName];

        if (!model) {
            return res.status(404).json({ message: `La tabla ${tableName} no existe` });
        }

        let results;

        // Búsqueda general para cualquier tabla con la columna "estado" 
        if (searchValue) {
            results = await model.findAll({
                where: {
                    [columnName]: {
                        [db.Sequelize.Op.like]: `%${searchValue}%`
                    },
                    estado: true // Filtra registros activos si la tabla contiene esta columna
                }
            });
        } else {
            results = await model.findAll({
                where: { estado: true } // Filtra registros activos sin búsqueda específica
            });
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            message: "Error al realizar la búsqueda",
            error: error.message
        });
    }
};





exports.getTipoNombres = async (req, res) => {
    try {
        const { tableName, columnName, searchValue } = req.query;

        // Limitar a TipoHabitacion o TipoEmpleado
        if (tableName !== 'TipoHabitacion' && tableName !== 'TipoEmpleado') {
            return res.status(400).json({ message: "Tabla no permitida. Use TipoHabitacion o TipoEmpleado." });
        }

        const model = db[tableName];

        if (!model) {
            return res.status(404).json({ message: `La tabla ${tableName} no existe` });
        }

        let results;

        // Si hay un valor de búsqueda
        if (searchValue) {
            results = await model.findAll({
                where: {
                    [columnName]: {
                        [db.Sequelize.Op.like]: `%${searchValue}%`
                    }
                }
            });
        } else {
            // Si no hay un valor de búsqueda, traer todos los registros de la tabla
            results = await model.findAll();
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los datos",
            error: error.message
        });
    }
};


exports.getTipoHabitacionNombres = async (req, res) => {
    try {
        const model = db.TipoHabitacion;

        if (!model) {
            return res.status(404).json({ message: `La tabla TipoHabitacion no existe` });
        }

        // Obtener solo los nombres de los tipos de habitación
        const results = await model.findAll({
            attributes: ['nombre'] // Suponiendo que el campo que contiene el nombre es 'nombre'
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los nombres de los tipos de habitación",
            error: error.message
        });
    }
};
