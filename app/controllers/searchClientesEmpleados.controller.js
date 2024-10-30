// controladorClientesEmpleados.js
const db = require('../config/db.config.js'); // Importar db

const Persona = db.Personas;
const Cliente = db.Clientes;
const Empleado = db.Empleados;


exports.searchClientesEmpleados = async (req, res) => {
    try {
        const { tableName, searchValue } = req.query;

        if (!tableName) {
            return res.status(400).json({ message: "Debe especificar el nombre de la tabla" });
        }

        // Obtener el modelo de la tabla especificada
        const model = db[tableName];

        if (!model) {
            return res.status(404).json({ message: `La tabla ${tableName} no existe` });
        }

        let results;

        // Definir el modelo relacionado (Personas)
        const relatedModel = db.Personas; 

        // Realizar la búsqueda en el modelo correspondiente
        if (tableName === 'Clientes' || tableName === 'Empleados') {
            const searchField = tableName === 'Clientes' ? 'id_cliente' : 'id_empleado';

            results = await model.findAll({
                where: {
                    [searchField]: searchValue // Buscamos por el ID correspondiente
                },
                include: [{
                    model: relatedModel,
                    as: 'persona', // Asegúrate de que este sea el alias que has definido
                    required: true // Esto hará un INNER JOIN
                }]
            });
        } else {
            return res.status(400).json({ message: "El nombre de la tabla debe ser 'Clientes' o 'Empleados'" });
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            message: "Error al realizar la búsqueda",
            error: error.message
        });
    }
};
