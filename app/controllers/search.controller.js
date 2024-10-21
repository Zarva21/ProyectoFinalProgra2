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

        // Verifica que todos los parámetros necesarios estén presentes
        if (!tableName || !columnName || !searchValue) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos: tableName, columnName, searchValue' });
        }

        // Verifica si la tabla especificada existe en la base de datos
        if (!db[tableName]) {
            return res.status(404).json({ message: 'Tabla no encontrada en la base de datos' });
        }

        const Model = db[tableName];

        // Realiza la búsqueda en la tabla con la cláusula LIKE
        const results = await Model.findAll({
            where: {
                [columnName]: {
                    [db.Sequelize.Op.like]: `%${searchValue}%`
                }
            }
        });

        // Devuelve los resultados de la búsqueda
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error al realizar la búsqueda', error: error.message });
    }
};

exports.generalSearch = async (req, res) => {
    try {
        const { tableName, columnName, searchValue } = req.query;

        if (!tableName || !columnName) {
            return res.status(400).json({ message: "Debe especificar el nombre de la tabla y la columna" });
        }

        // Obtener el modelo de la tabla especificada
        const model = db[tableName];

        if (!model) {
            return res.status(404).json({ message: `La tabla ${tableName} no existe` });
        }

        let results;
        if (searchValue) {
            // Si se proporciona un valor de búsqueda, hacer una búsqueda con LIKE
            results = await model.findAll({
                where: {
                    [columnName]: {
                        [db.Sequelize.Op.like]: `%${searchValue}%`
                    }
                }
            });
        } else {
            // Si no se proporciona un valor de búsqueda, devolver todos los registros
            results = await model.findAll();
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            message: "Error al realizar la búsqueda",
            error: error.message
        });
    }
};

