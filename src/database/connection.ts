import { Sequelize } from "sequelize";

const sequelize = new Sequelize('miduelo', 'Michelle', 'hD*F9jBw@U6dS6Ym', {
    host: '52.188.186.87',
    dialect: "mysql",
    port: 3306, 
    dialectOptions: {
        connectTimeout: 60000 
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
});