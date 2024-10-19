const env = {
    database: 'ProyectoFinalProgra2',
    username: 'proyectofinalprogra2_user',
    password: 'YMckxQXqwD1kQrnH455Bd7wTBrHPcVCH',
    host: 'dpg-cs9o1sa3esus739is6o0-a.oregon-postgres.render.com',
    port: '5432',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;