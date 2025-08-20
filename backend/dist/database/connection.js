"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('myduelo', 'root', 'root', {
    host: 'localhost',
    dialect: "mysql"
});
exports.default = sequelize;
//const sequelize = new Sequelize('myduelo','dev_user', 'P4ssw0rd-S3gur0!',{
//    host: 'localhost',
//    dialect: "mysql"
//})
//export default sequelize;
