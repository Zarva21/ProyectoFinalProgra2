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
db.TipoEmpleado = require('../models/tipoempleado.model.js')(sequelize, Sequelize); // Asegúrate de cargar TipoEmpleado antes de Empleados
db.Empleados = require('../models/empleados.model.js')(sequelize, Sequelize);
db.Clientes = require('../models/clientes.model.js')(sequelize, Sequelize);





module.exports = db;