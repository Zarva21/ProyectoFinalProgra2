const env = {
    database: 'ProyectoFinalProgra2',
    username: 'postgres',
    password: '1234',
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};