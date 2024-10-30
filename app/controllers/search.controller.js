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

        // Obtener el modelo de la tabla especificada
        const model = db[tableName];

        if (!model) {
            return res.status(404).json({ message: `La tabla ${tableName} no existe` });
        }

        let results;

        // Manejo de búsqueda específica para Clientes y Empleados
        if (tableName === 'Clientes' || tableName === 'Empleados') {
            const relatedModel = db.Personas;

            // Buscamos en la tabla de Clientes o Empleados
            results = await model.findAll({
                where: {
                    [columnName]: searchValue // Buscamos por el campo especificado
                },
                include: [{
                    model: relatedModel,
                    as: 'persona', // Asegúrate de que este sea el alias correcto que has definido
                    required: true // Esto hará un INNER JOIN
                }]
            });
        } else {
            // Si se proporciona un valor de búsqueda, hacer una búsqueda con LIKE
            if (searchValue) {
                results = await model.findAll({
                    where: {
                        [columnName]: {
                            [db.Sequelize.Op.like]: `%${searchValue}%`
                         },
                        estado: true // Filtra registros activos
                    }
                });
            } else {
                // Si no se proporciona un valor de búsqueda, devolver todos los registros
                results = await model.findAll({
                    where: { estado: true } // Filtra registros activos sin búsqueda específica
                });
            }
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            message: "Error al realizar la búsqueda",
            error: error.message
        });
    }
};



/*  
la cosa es que si una persona en un formulario de cleinte, y quisiera dar el id del ciente,
el id de cleinte no esta en persona, lo mismo en la talba de empleado que no podra encotnrar eso mismo ya que alf ianl en empleados y cliente son los 
unicos que tengran ese extra en el ual estan relacionados a otra tabla de la cual tiene la informacion general

PERSONAS 	        
Id Persona	primary key 
Nombre	Varchar(20)
Apellido	Varchar(20)
Fecha Nacimiento	Date
Nit	varchar(20)
Correo 	varchar(40)
Genero	varchar(1)
DPI	Int (20)
Numero	int
Estado	Boolean

CLIENTES	
Id Persona	primary key
ID cliente	serial
	
EMPLEADOS	
Id persona 	primary key 
Id Empleado	serial 
id tipo empleado	primary key 
Activo	Boolean
*/

exports.getTipoNombres = async (req, res) => {
    try {
        const { tableName } = req.query;

        // Verificamos que el nombre de la tabla sea uno de los permitidos
        if (tableName !== 'TipoHabitacion' && tableName !== 'TipoEmpleado') {
            return res.status(400).json({ message: "Tabla no permitida. Use TipoHabitacion o TipoEmpleado." });
        }

        const model = db[tableName];

        if (!model) {
            return res.status(404).json({ message: `La tabla ${tableName} no existe` });
        }

        // Realizamos la búsqueda solo de los registros activos y obtenemos solo el campo 'nombre'
        const results = await model.findAll({
            attributes: ['nombre'],
            where: { estado: true } // Filtra solo los registros activos
        });

        // Mapeamos los resultados para devolver solo una lista de nombres
        const nombres = results.map((result) => result.nombre);

        res.status(200).json(nombres);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los nombres",
            error: error.message
        });
    }
};