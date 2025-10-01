"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('miduelo', 'Michelle', 'hD*F9jBw@U6dS6Ym', {
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
exports.default = sequelize;




//const sequelize = new Sequelize('myduelo','dev_user', 'P4ssw0rd-S3gur0!',{
//    host: 'localhost',
//    dialect: "mysql"
//})
//export default sequelize;
