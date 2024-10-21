const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    

    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Personas = require('../models/personas.model.js')(sequelize, Sequelize);
db.TipoEmpleado = require('../models/tipoempleado.model.js')(sequelize, Sequelize);
db.Empleados = require('../models/empleados.model.js')(sequelize, Sequelize);
db.Clientes = require('../models/clientes.model.js')(sequelize, Sequelize);
db.RolUsuario = require('../models/rolesdeusuario.model.js')(sequelize, Sequelize); 
db.Usuario = require('../models/usuarios.model.js')(sequelize, Sequelize); 
db.TipoHabitacion = require('../models/tiposdehabitacion.model.js')(sequelize, Sequelize);
db.Habitacion = require('../models/habitaciones.model.js')(sequelize, Sequelize);
db.Reserva = require('../models/reservas.model.js')(sequelize, Sequelize);
db.Factura = require('../models/factura.model.js')(sequelize, Sequelize); 


db.TipoHabitacion.associate(db);
db.Habitacion.associate(db);

module.exports = db;