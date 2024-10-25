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